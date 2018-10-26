import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { MinistryProvider, IntMinistrySheet } from '../../providers/ministry/ministry';
import { NotificationProvider } from '../../providers/notification/notification';
import { TypeInputUI, IntListItem } from '../../providers/data-adaptor/data-adaptor';
import { IntArrayChanges, CommonProvider } from '../../providers/common/common';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';
import { WechatProvider } from '../../providers/wechat/wechat';
import * as moment from 'moment';
import * as _ from 'lodash';

/**
 * Generated class for the MinistryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ministry-page',
  segment: 'ministry/:forDate'
})
@Component({
  selector: 'page-ministry',
  templateUrl: 'ministry.html',
})
export class MinistryPage implements OnInit {

    @ViewChild('slides') slides: Slides;

    preloadedDate: string;

    roleChanges: IntArrayChanges[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ministrySvc: MinistryProvider,
        public notificationSvc: NotificationProvider,
        public common: CommonProvider,
        public content: DataProvider,
        public wechat: WechatProvider
    ) {
        this.preloadedDate = this.navParams.get("forDate");
        this.roleChanges = [];
    }

    ionViewDidLoad() {
    }

    share(): void {
      let base64Url = btoa(this.ministrySvc.publishUrl);
      let url = `http://ibc.medocs.com.au/app/#/iframe/侍奉计划/${base64Url}`;
      // console.log(url);
      // console.log(this.ministrySvc.publishUrl);
      this.wechat.weChatShareLink(url,'事工计划','下月侍奉安排', this.content.urls['ministry-icon'] || 'https://cordova.apache.org/images/cordova_256.png');
    }

    pushSheet(): void {
        this.ministrySvc.pushSheet();
        setTimeout(() => {
            this.slides.slideTo(this.ministrySvc.ministrySheets.length-1, 100);
        }, 500);
    }

    removeSheet(i: number): void {
        this.ministrySvc.spliceSheet(i);
        setTimeout(() => {
            this.slides.slidePrev();
        });
        // this.slides.slideTo(this.ministrySvc.ministrySheets.length-1, 500);
    }

    undo(): void {
        this.ministrySvc.undo();
        this.slides.slideTo(0, 200);
    }

    setMinistry(sheet: IntMinistrySheet, roleKey: string, contactId: string) {
      /* Remove any existing role on the same day */
      this.ministrySvc.ministryRoles.forEach(role => {
        if (sheet[role.key] == contactId) {
          sheet[role.key] = null;
        }
      });

      /* Assign the new role to contactId */
      if (contactId == 'N/A') {
        sheet[roleKey] = null;
      } else {
        sheet[roleKey] = contactId;
      }
    }

    save(): void {
        // diff the role changes:
        
        let sheetsBeforeSaving = _.cloneDeep(this.ministrySvc.originalMinistrySheets);
        let sheetsAfterSaving = _.cloneDeep(this.ministrySvc.ministrySheets);

        // console.log('--- old sheets ---');
        // console.log(JSON.stringify(sheetsBeforeSaving, null, 2));
        // console.log('--- new sheets ---');
        // console.log(JSON.stringify(sheetsAfterSaving, null, 2));
       
        this.ministrySvc.saveSheet().then(msg => {
            let toast = this.ministrySvc.toastCtrl.create({
                message: '事工計劃已成功保存',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
            });

            this.reportRoleChange(sheetsBeforeSaving, sheetsAfterSaving);

            /* Now the saved sheets will become the new original */
            this.ministrySvc.originalMinistrySheets = _.cloneDeep(this.ministrySvc.ministrySheets);

            // this.sendAddNotification("201", "2018-04-08", "choir2", "敬拜");

            toast.present();
        }, err => {
            let toast = this.ministrySvc.toastCtrl.create({
                message: '保存失败: ' + JSON.stringify(err),
                duration: 3000,
                position: 'top',
                cssClass: 'toast-danger'
            });

            toast.present();
        })
    }

    reportRoleChange(oldSheets: IntMinistrySheet[], newSheets: IntMinistrySheet[]) {
      this.roleChanges = [];
      let sheetsDiffs = this.common.getArrayDiffs(oldSheets, newSheets, "date", undefined, true);

      console.log(sheetsDiffs);

      /* New Sheets */
      if (sheetsDiffs.newItems.length > 0) {
        sheetsDiffs.newItems.forEach((sheet: IntMinistrySheet) => {
          this.ministrySvc.ministryRoles.forEach(role => {
            if (sheet[role.key]) {
              console.log(`=== Add ${role.caption} to ${sheet[role.key]}!`);
              this.sendAddNotification(sheet[role.key], sheet.date, role.key, role.caption);
            }
          })
        })
      }

      /* Deleted Sheets */
      if (sheetsDiffs.deletedItems.length > 0) {
        /* We will ignore all obsolete sheets */
        sheetsDiffs.deletedItems.filter((sheet: IntMinistrySheet) => new Date(sheet.date).getTime() > new Date().getTime()).forEach((sheet: IntMinistrySheet) => {
          this.ministrySvc.ministryRoles.forEach(role => {
            if (sheet[role.key]) {
              console.log(`=== Cancel ${role.caption} to ${sheet[role.key]}!`);
              this.sendCancelNotification(sheet[role.key], sheet.date, role.key, role.caption);
            }
          })
        })
      }

      if (sheetsDiffs.updatedItems.length > 0) {
        sheetsDiffs.updatedItems.forEach(item => {
          let oldSheet = item.oldItem;
          let newSheet = item.newItem;
          this.ministrySvc.ministryRoles.forEach(role => {
            if (oldSheet[role.key] != newSheet[role.key]) {
              console.log(`Update member for ${newSheet.date} - ${role.caption}: ${oldSheet[role.key]} => ${newSheet[role.key]}`);
              this.sendCancelNotification(oldSheet[role.key], oldSheet.date, role.key, role.caption);
              this.sendAddNotification(newSheet[role.key], newSheet.date, role.key, role.caption);
            }
          });
        })
      }
    }

    sendCancelNotification(contactId: string, datetime: string, roleKey: string, roleCaption: string): void {
        let datetimeCaption = moment(datetime).format("M月D日");
        let item: IntListItem = {
          datetime : datetime,
          isNew : true,
          key : `${datetime}-cancel-service`,
          value: roleKey,
          params : {
            forDate : datetime
          },
          redirect : "MinistryPage",
          sender : this.ministrySvc.content.myselfContact.id,
          subtitle : "",
          title : `${datetimeCaption} 事奉取消 - ${roleCaption}`
        }

        this.notificationSvc.addNotification(contactId, item);
    }    

    sendAddNotification(contactId: string, datetime: string, roleKey: string, roleCaption: string): void {
        let datetimeCaption = moment(datetime).format("M月D日");
        let item = {
          datetime : datetime,
          isNew : true,
          key : `${datetime}-add-service`,
          params : {
            forDate : datetime
          },
          value: roleKey,
          popUpQuestion : {
            caption : `${datetimeCaption}你能参加<${roleCaption}>事奉吗？`,
            default : true,
            key : "confirmMinistry",
            notifications : [ {
              answer : "no",
              key : `${datetime}-confirm-service`,
              subtitle : `{{myselfContact.name}} ({{myselfContact.chinese_name}}) 无法参加${datetimeCaption}敬拜`,
              title : `${datetimeCaption}事奉缺席 - ${roleCaption}`,
              value : roleKey,
              redirect : "MinistryPage",
              params : {
                forDate : datetime
              }
            }, {
              answer : "yes",
              key : `${datetime}-confirm-service`,
              subtitle : `{{myselfContact.name}} ({{myselfContact.chinese_name}}) 已确认事奉${datetimeCaption}敬拜`,
              title : `${datetimeCaption}事奉确认 - ${roleCaption}`,
              value : roleKey,
              redirect : "MinistryPage",
              params : {
                forDate : datetime
              }              
            } ],
            recipient : this.ministrySvc.content.myselfContact.id,
            type : TypeInputUI.Boolean
          },
          redirect : "MinistryPage",
          sender : this.ministrySvc.content.myselfContact.id,
          subtitle : "",
          title : `${datetimeCaption} ${this.ministrySvc.content.myselfContact.name}邀请你參加事奉 - ${roleCaption}`
        }

        this.notificationSvc.addNotification(contactId, item);
    }

    ngOnInit(): void {
        if (this.preloadedDate) {
            let subscription = this.ministrySvc.content.ministries$.subscribe(ministries => {
                let targetIndex = ministries.map(m => m.date).indexOf(this.preloadedDate);
                // console.log(`targetIndex = ${targetIndex}`);
                if (targetIndex > 0) {
                    setTimeout(() => {
                        this.slides.slideTo(targetIndex);
                    }, 200)
                }
                subscription.unsubscribe();
            }, console.error);
        }
    }

}

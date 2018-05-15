import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BrowserProvider } from '../../providers/browser/browser';
import { CommonProvider } from '../../providers/common/common';
import { database, DataProvider, IntListItem, IntContact, IntActivity, IntPopupTemplateItem } from '../../providers/data-adaptor/data-adaptor';
import { AudioProvider } from '../../providers/audio/audio';
import { NotificationProvider } from '../../providers/notification/notification';
import { Observable, Subscription } from 'rxjs';
import { ChatPage } from '../../pages/chat/chat';
import * as moment from 'moment';

/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage implements OnDestroy {

  activityIndex: number;
  activityId: string;
  activity: IntActivity = {};
  activityDB: database.Reference;
  activity$: Observable<IntActivity> = Observable.of({});
  persons: IntContact[] = [];

  currentParticipantsCount: number = 0;

  myIndex: number = -1

  subscriptions: Subscription[] = [];

  question: IntPopupTemplateItem;

  lastContactCounts: number;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public browser: BrowserProvider, 
      public commonSvc: CommonProvider,
      public content: DataProvider,
      public audioSvc: AudioProvider,
      public notificationSvc: NotificationProvider
      ) {

      this.activityIndex = navParams.get('itemIndex');
      this.activityId = navParams.get('itemId');

      this.activity$ = this.content.activities$.map(res => res.filter(resItem => resItem.id == this.activityId)[0]);
      this.activityDB = this.content.activitiesDB.child(`${this.activityIndex}`);

      this.subscriptions.push(this.activity$.subscribe((act: IntActivity) => {
          this.activity = act;
          this.currentParticipantsCount = act.participants ? act.participants.length : 0;

          if (act && act.participants) {
            if (!this.content.myselfContact) {
              this.myIndex = -1;
            } else {
              this.myIndex = act.participants.map(p => p.userId).indexOf(this.content.myselfContact.id);
            }
            this.persons = this.content.allContacts.filter(contact => this.activity.participants.filter(p => p.userId == contact.id).length > 0);
          } else {
            this.myIndex = -1;
            this.persons = [];
          }

          if (act && act.question) {
              act.answerChoices = act.answerChoices || "";
              this.question = {
                  "caption": act.question,
                  "key": act.questionKey,
                  "type": act.questionType,
                  "lookupSource": Observable.of(act.answerChoices.split(/\s*[,，]\s*/).map(v => {return {
                    caption: v,
                    value: v
                  }}))
              };
          }
      }, err => {}));

      this.subscriptions.push(this.content.lastCounts$.subscribe(lastCounts => {
          this.lastContactCounts = lastCounts && lastCounts['contacts'];
      }, err => { }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }

  getParticipantFromPerson(person: IntContact) {
    if (person) {
      return this.activity.participants.filter(p => p.userId == person.id)[0];
    } else {
      return null;
    }
  }

  sendAddNotification(): void {
      let datetimeCaption = moment(this.activity.datetime).format("M月D日");
      let item: IntListItem = {
          datetime: this.activity.datetime,
          isNew: true,
          key: `${this.activity.key || this.activity.title}-${this.activity.datetime}`,
          value: this.activity.key || this.activity.title,
          params: {
              itemIndex: this.activityIndex || null,
              itemId: this.activityId
          },
          redirect: "ActivityPage",
          sender: this.content.myselfContact.id,
          subtitle: "",
          title: `教會活動：${datetimeCaption} - ${this.activity.title}`
      }

      this.notificationSvc.addNotification(this.content.myselfContact.id, item);
  } 

  sendCancelNotification(): void {
    this.notificationSvc.removeMyNotification(`${this.activity.key || this.activity.title}-${this.activity.datetime}`);
  }

  register(val: string): void {

    if (this.myIndex >= 0) {
      /* Already registered */
      return;
    }    

    this.activityDB
        .child('participants')
        .child(`${this.currentParticipantsCount}`)
        .set({
            userId: this.content.myselfContact.id,
            comment: val
        }).then(() => {
            this.commonSvc.toastSuccess(`歡迎加入 ${this.activity.title} 活動!`);
            this.sendAddNotification()
        }, err => {
            this.commonSvc.toastFailure('加入失敗', err);
        })


    // let createAnserFunc = (val: string = null) => {
    //   console.log(val);
    //   return () => {
    //     this.activityDB
    //       .child('participants')
    //       .child(`${this.currentParticipantsCount}`)
    //       .set({
    //         userId: this.content.myselfContact.id,
    //         comment: val
    //       }).then(() => {
    //         this.commonSvc.toastSuccess(`歡迎加入 ${this.activity.title} 活動!`);
    //       }, err => {
    //         this.commonSvc.toastFailure('加入失敗', err);
    //       })
    //     }
    // };

    // if (this.activity.question) {
    //     let alert;
    //     switch (this.activity.questionType) {
    //         case "yesOrNo":
    //             alert = this.commonSvc.alertCtrl.create({
    //                 message: this.activity.question,
    //                 // inputs: [
    //                 //     {
    //                 //       type: 'radio',
    //                 //       label: '否',
    //                 //       value: '否',
    //                 //     },
    //                 //     {
    //                 //       type: 'radio',
    //                 //       label: '是',
    //                 //       value: '是',
    //                 //     },                        
    //                 // ],
    //                 buttons: [{
    //                     text: '否',
    //                     role: 'cancel',
    //                     handler: createAnserFunc('否')
    //                 },
    //                 {
    //                     text: '是',
    //                     handler: createAnserFunc('是')
    //                   }
    //                 ]
    //             });
    //             alert.present();
    //             // code...
    //             break;

    //         case "selection":
    //             alert = this.commonSvc.alertCtrl.create({
    //                 message: this.activity.question,
    //                 inputs: [],
    //                 buttons: [
    //                   {
    //                     text: '確定參加',
    //                     handler: data => createAnserFunc(data)()
    //                   }
    //                 ]
    //             });
    //             if (this.activity.answerChoices) {
    //               this.activity.answerChoices.split(/\s*[,，]\s*/).forEach(choice => {
    //                 alert.addInput({
    //                   type: 'radio',
    //                   label: choice,
    //                   value: choice
    //                 });
    //               });
    //             }
    //             alert.present();
    //             break;

    //         default:
    //             alert = this.commonSvc.alertCtrl.create({
    //                 message: this.activity.question,
    //                 inputs: [
    //                     {
    //                       name: 'answer',
    //                     }
    //                 ],
    //                 buttons: [
    //                   {
    //                     text: '確定參加',
    //                     handler: data => createAnserFunc(data.answer)()
    //                   }
    //                 ]
    //             });
    //             alert.present();            
    //             break;
    //       }
    // } else {
    //   createAnserFunc()();
    // }
  }

  cancel(): void {
      this.commonSvc.confirmDialog(null, '你真的要退出嗎？', () => {
          if (this.myIndex >= 0) {
              this.activity.participants.splice(this.myIndex, 1);
              console.log(this.activity.participants);
              this.activityDB
                  .child('participants')
                  .set(this.activity.participants).then(() => {
                      this.commonSvc.toastSuccess(`你已經退出 ${this.activity.title} 活動!`);
                      this.sendCancelNotification();
                  }, err => {
                      this.commonSvc.toastFailure('退出失敗', err);
                  })
          }
      });
  }

  addContact(): void {
      let newId = this.lastContactCounts + 1;
      Promise.all([
          this.content.allContactsDB.child(`${newId}`).set({
              id: newId,
              name: 'Activity',
              chinese_name: this.activity.title,
              skills: [],
              class: 'group',
              createDT: moment().format("YYYY-MM-DD HH:mm:ss")
          }),
          this.content.lastCountDB.child('contacts').set(newId)
      ])
          .then(() => {
              this.commonSvc.toastSuccess('添加成功');
          })
          .catch(err => {
              this.commonSvc.toastFailure('添加失败', err);
          });
  }

  goToChat(): void {
    this.navCtrl.push(ChatPage, {contact: {id: this.activity.chatId}});
  }

  openLink(url?: string): void {
      this.browser.openPage(url);
  }

  ionViewDidLoad() {
  }

}

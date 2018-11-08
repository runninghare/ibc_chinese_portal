import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { DataProvider, IntUserGroup, IntContact } from '../../providers/data-adaptor/data-adaptor';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import { CommonProvider } from '../../providers/common/common';
import { NotificationProvider } from '../../providers/notification/notification';
import { ListPage } from '../../pages/list/list';
import * as moment from 'moment';
import * as Mustache from 'mustache';

/**
 * Generated class for the AdminNotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'admin-notif-page'
})
@Component({
  selector: 'page-admin-notif',
  templateUrl: 'admin-notif.html',
})
export class AdminNotifPage {

    groups: IntUserGroup[] = [];

    groupRecipients: string[] = [];

    memberRecipients: IntContact[] = [];

    lastResponse: any[];

    title: string;

    redirect: string;

    params: string;

    hyperlink: string;

    thumbnail: string;

    get stringMembers(): string {
        return this.memberRecipients.map(c => `${c.chinese_name} (${c.name})`).join(', ');
    }

    template: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public content: DataProvider, public notificationSvc: NotificationProvider,
        public common: CommonProvider, public modalCtrl: ModalController, public ibcHttp: IbcHttpProvider) {
        this.content.groupManagement$.subscribe(groups => {
            this.groups = groups;
        })
    }

    selectMembers(): void {
        let modal = this.modalCtrl.create(ListPage, {
            type: Object.assign({}, this.content.contactsParams, {
                preselectedItemKeys: this.memberRecipients.map(c => c.username)
            })
        });
        modal.present();

        modal.onDidDismiss(data => {
            console.log(data);
            if (data && Array.isArray(data)) {
                this.memberRecipients = data;
            }
        });
    }

    collectMembers(): string[] {
        let memberHash: any = {};
        if (this.groupRecipients) {
            this.groupRecipients.map(gr => this.groups.filter(g => g.groupName == gr)[0]).forEach(g => {
                if (g.members) {
                    g.members.forEach(m => {
                        memberHash[m] = 1;
                    })
                }
            })
        }
        this.memberRecipients.forEach(c => {
            memberHash[c.username] = 1;
        });
        return Object.keys(memberHash);
    }

    get allRecipientsText(): string {
        let membersCollected = this.collectMembers();
        if (!membersCollected) return null;
        return this.content.allContacts.filter(contact => membersCollected.filter(username => username == contact.username).length > 0)
                                       .map(c => `${c.chinese_name} (${c.name})`).join(',');
    }

    ionViewDidLoad() {
    }

    sendAddNotification(contactId: string, title: string, content: string, 
        redirect?: string, params?: any, thumbnail?: string, hyperlink?: string): void {
        let datetimeCaption = moment().format("M月D日");
        let datetime = moment().format('YYYYMMDDHHmmss');
        let id = this.common.makeRandomString(10);
        let item = {
          datetime : datetimeCaption,
          isNew : true,
          key : `${datetime}-${id}`,
          params: params || {},
          value: id,
          redirect: redirect || null,
          hyperlink: hyperlink || null,
          thumbnail: thumbnail || null,
          sender : this.content.myselfContact.id,
          subtitle : content || null,
          title : `[${datetimeCaption} 通知] ${title}`
        };

        this.notificationSvc.addNotification(contactId, item);
    }    

    send(): void {

        let membersCollected = this.collectMembers();
        if (!membersCollected) return null;
        let recipients = this.content.allContacts.filter(contact => membersCollected.filter(username => username == contact.username).length > 0);

        let template = this.template;

        if (recipients && recipients.length > 0 && template) {
            this.common.confirmDialog(null, '你确定要发送吗？', () => {
                let promises = [];
                recipients.forEach(contact => {
                    console.log(contact);
                    let params = {};
                    try {
                        params = JSON.parse(this.params);
                    } catch (e) {
                        params = {};
                    }
                    let content = Mustache.render(template, contact);
                    promises.push(this.sendAddNotification(contact.id, this.title, content, this.redirect, params, this.thumbnail, this.hyperlink));
                });

                Promise.all(promises).then(res => {
                    this.common.toastSuccess('发送成功');
                }, err => {
                    this.common.toastFailure('发送失败', err);
                })
            })
        }
    }

}

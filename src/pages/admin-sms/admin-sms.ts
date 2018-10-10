import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { DataProvider, IntUserGroup, IntContact } from '../../providers/data-adaptor/data-adaptor';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import { CommonProvider } from '../../providers/common/common';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the AdminSmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-admin-sms',
    templateUrl: 'admin-sms.html',
})
export class AdminSmsPage {

    groups: IntUserGroup[] = [];

    groupRecipients: string[] = [];

    memberRecipients: IntContact[] = [];

    lastResponse: any[];

    get stringMembers(): string {
        return this.memberRecipients.map(c => `${c.chinese_name} (${c.name})`).join(', ');
    }

    noSendingSMS: boolean;

    _type: string;
    get type(): string {
        return this._type;
    }

    set type(s: string) {
        this._type = s;
        if (s == 'resetPassword') {
            this.template =
                `您好，您的依斯靈頓中文教會APP密碼已重置。
用戶名：{{username}}
新密碼：{{password}}, 請盡快登錄後修改`;
        } else {
            this.template = '';
        }
    }

    template: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public content: DataProvider,
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdminSmsPage');
    }

    send(): void {
        let users = this.collectMembers();
        let template = this.template;
        let send_sms = !this.noSendingSMS;

        if (users && users.length > 0 && template) {
            if (this.type == 'resetPassword') {
                this.common.confirmDialog(null, '你确定要重置密码吗？', () => {
                    this.ibcHttp.post('sms/send_reset_password', { users, template, send_sms }).then(res => {
                        this.common.toastSuccess('密码重置成功');
                        this.lastResponse = res;
                    }).catch(err => {
                        this.common.toastFailure('密码重置失败', err);
                        this.lastResponse = [];
                    })
                })
            } else {
                this.common.confirmDialog(null, '你确定要发送吗？', () => {
                    this.ibcHttp.post('sms/send_sms', { users, template }).then(res => {
                        this.common.toastSuccess('发送成功');
                        this.lastResponse = [];
                    }).catch(err => {
                        this.common.toastFailure('发送失败', err);
                        this.lastResponse = [];
                    });
                })                
            }
        }
    }

}

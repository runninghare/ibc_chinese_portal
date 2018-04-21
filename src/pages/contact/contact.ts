import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Searchbar } from 'ionic-angular';
import { AudioProvider } from '../../providers/audio/audio';
import { S2tProvider } from '../../providers/s2t/s2t';
import { DataProvider, IntContact, IntPopupTemplateItem} from '../../providers/data-adaptor/data-adaptor';
import { ChatPage } from '../../pages/chat/chat';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupComponent } from '../../components/popup/popup';
import { CommonProvider } from '../../providers/common/common';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as moment from 'moment';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage implements OnDestroy {

  @ViewChild('searchBar') searchBar: Searchbar;

  title: string;

  onlyForFriends: boolean = false;

  subscriptions: Subscription[] = [];

  lastCounts: any = {};

  prefilter: (contact: IntContact) => boolean;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public s2t: S2tProvider, 
    public cacheSvc: FileCacheProvider, public sanitizer: DomSanitizer,
    public content: DataProvider, public audioSvc: AudioProvider, public socialSharing: SocialSharing, 
    public navLauncher: LaunchNavigator, public modalCtrl: ModalController, public commonSvc: CommonProvider) {

      this.onlyForFriends = this.navParams.get('myFriends');
      this.title = this.navParams.get('title');
      this.prefilter = this.navParams.get('prefilter') || (() => true);

      this.subscriptions.push(this.content.allContacts$.subscribe(res => {
          // console.log(res);
          this.items = this.allContacts = res;

          if (this.onlyForFriends) {
            let friends = Object.keys(this.content.myselfContact.myFriends || {});

            this.items = this.items.filter(contact => {
              return friends.filter(f => f == contact.id).length > 0
            });
          }

          let value = this.searchBar.value;
          this.getItems({ target: { value } });
      }, err => { }));

      this.subscriptions.push(this.content.lastCounts$.subscribe(lastCounts => {
        this.lastCounts = lastCounts;
      }, err => {}));
  }

  items: IntContact[];
  mappedItems: IntContact[];
  allContacts: IntContact[];

  navOptions: LaunchNavigatorOptions;

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getItems(ev: any) {
      let val = `${ev.target.value || ''}`.toLowerCase();

      this.mappedItems = this.items.filter(this.prefilter).filter(contact => {
          if (!val) return true;
          if (!contact.skills) {
              contact.skills = [];
          }
          return `${contact.name} ${contact.chinese_name} ${contact.email} ${contact.mobile} ${contact.skills.join(' ')}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
      });
  }

  addFriend(): void {
    let popupModal = this.modalCtrl.create(PopupComponent, { 
      title: this.title,
      definitions: [
        {
          key: 'id',
          caption: '选择联系人',
          type: 'dropdown',
          lookupSource: this.content.allContacts$,
          lookupCaption: option => `${option.name} (${option.chinese_name})`,
          lookupValue: 'id'
        }
      ],
      cancel: () => popupModal.dismiss(),
      save: (data: any) => {
        this.content.myselfContactDB.child('myFriends').child(data.id).set(1).then(() => {
          this.commonSvc.toastSuccess('添加成功');
          popupModal.dismiss();
        }, err => {
          this.commonSvc.toastFailure('添加失败', err);
          this.items.pop();
          popupModal.dismiss();
        });
      }
    });
    popupModal.present();
  }  

  deleteFriend(id: string): void {
    this.commonSvc.confirmDialog(null, '你确定要删除吗?', () => {
      this.content.myselfContactDB.child('myFriends').child(id).remove().then(() => {
        this.commonSvc.toastSuccess('删除成功');
      }, err => {
        this.commonSvc.toastFailure('删除失败', err);
      });
    });
  }

  isNew(contact: IntContact): boolean {
    if (!contact || !contact.createDT) return false;
    return this.commonSvc.differDays(contact.createDT) < 3;
  }

  addContact(): void {
    let popupModal = this.modalCtrl.create(PopupComponent, { 
      title: '聯繫人',
      definitions: [
        {
          key: 'name',
          caption: '英文名'
        },
        {
          key: 'chinese_name',
          caption: '中文名'
        },
        {
          key: 'skills',
          caption: '事奉',
          type: 'multi-dropdown',
          lookupSource: Observable.of([
            {name: "傳道"},
            {name: "主席"},
            {name: "敬拜"},
            {name: "司事"},
            {name: "司琴"},
            {name: "翻譯"},
            {name: "影音"}
          ]),
          lookupCaption: 'name',
          lookupValue: 'name'
        },
        {
          key: 'email',
          caption: '電子郵件'
        },
        {
          key: 'mobile',
          caption: '電話'
        },
        {
          key: 'address1',
          caption: '地址'
        },
        {
          key: 'state',
          caption: '省份',
        },
        {
          key: 'postcode',
          caption: '郵政編碼',
        }
      ],
      cancel: () => popupModal.dismiss(),
      save: (data: any) => {
        console.log(JSON.stringify(data,null,2));

        let lastId = this.lastCounts && this.lastCounts.contacts;

        console.log(`lastId = ${lastId}`);

        if (lastId && data && data.name) {
          let newId = lastId + 1;
          Promise.all([
            this.content.allContactsDB.child(newId).set({
              id: newId,
              name: data.name,
              chinese_name: data.chinese_name,
              skills: data.skills || [],
              email: data.email,
              mobile: data.mobile,
              address1: data.address1,
              state: data.state,
              postcode: data.postcode,
              createDT: moment().format("YYYY-MM-DD HH:mm:ss")
            }),
            this.content.lastCountDB.child('contacts').set(newId)
          ])
          .then(() => {
            this.commonSvc.toastSuccess('添加成功');
            popupModal.dismiss();
          })
          .catch(err => {
            this.commonSvc.toastFailure('添加失败', err);
            this.items.pop();
            popupModal.dismiss();
          });
        }
      }
    });
    popupModal.present();
  }  

  deleteContact(id: string): void {
    this.commonSvc.confirmDialog(null, '你确定要删除吗?', () => {
      this.content.allContactsDB.child(id).remove().then(() => {
        this.commonSvc.toastSuccess('删除成功');
      }, err => {
        this.commonSvc.toastFailure('删除失败', err);
      });
    });
  }

  hasEmail(contact: IntContact) {
    return contact && contact.email && !/@unknown/.test(contact.email);
  }

  ionViewDidLoad() {
  }

  contactClick(item: IntContact) {
    // this.audioSvc.play('startChatting');
    this.navCtrl.push(ChatPage, {contact: item});
  }

  geoNavigate(item: IntContact) {
    this.navLauncher.navigate(`${item.address1} ${item.address2} ${item.province} ${item.state} ${item.postcode}`).then(() => {
    }, console.error);
  }

}

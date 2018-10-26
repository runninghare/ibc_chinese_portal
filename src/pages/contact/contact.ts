import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Searchbar } from 'ionic-angular';
import { AudioProvider } from '../../providers/audio/audio';
import { S2tProvider } from '../../providers/s2t/s2t';
import { DataProvider, IntContact, IntPopupTemplateItem, TypeInputUI} from '../../providers/data-adaptor/data-adaptor';
import { ChatPage } from '../../pages/chat/chat';
import { MapPage } from '../../pages/map/map';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupComponent } from '../../components/popup/popup';
import { CommonProvider } from '../../providers/common/common';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'contact-page'
})
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

  notifTracker: any;

  templateForAdd: IntPopupTemplateItem[] = [
        {
          key: 'username',
          caption: '用户ID (Unique)'
        },
        {
          key: 'name',
          caption: '英文名'
        },
        {
          key: 'chinese_name',
          caption: '中文名'
        },
        {
          key: 'class',
          caption: '联系人类型',
          type: TypeInputUI.Dropdown,
          lookupSource: Observable.of([
              {
                  val: null,
                  cap: '个人'
              },
              {
                  val: 'group',
                  cap: '群'
              },
          ]),
          lookupCaption: 'cap',
          lookupValue: 'val',
        },      
        {
          key: 'skills',
          caption: '事奉',
          type: TypeInputUI.MultiDropdown,
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
        },
        {
          key: 'hidden',
          caption: '隐藏',
          type: TypeInputUI.Boolean
        }
      ];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public s2t: S2tProvider, 
    public cacheSvc: FileCacheProvider, public sanitizer: DomSanitizer, public ibcHttp: IbcHttpProvider,
    public content: DataProvider, public audioSvc: AudioProvider, public socialSharing: SocialSharing, 
    public navLauncher: LaunchNavigator, public modalCtrl: ModalController, public commonSvc: CommonProvider) {

      this.onlyForFriends = this.navParams.get('myFriends');
      this.title = this.navParams.get('title');
      this.prefilter = this.navParams.get('prefilter') || (() => true);

      this.subscriptions.push(
        Observable.combineLatest(this.content.currentUser$, this.content.allContacts$).subscribe(res => {
          // console.log(res);
          this.items = this.allContacts = res[1];

          if (this.onlyForFriends) {
            let friends = Object.keys(this.content.myselfContact.myFriends || {});

            this.items = this.items.filter(contact => {
              return friends.filter(f => f == contact.id).length > 0
            });
          }

          if (this.notifTracker) {
            console.log('=== turn off existing notif tracker ===');
            this.content.allStatusDB.child(this.content.myselfContact.id).off('value', this.notifTracker);
          }

          this.notifTracker = this.content.allStatusDB.child(this.content.myselfContact.id).on('value', snapshot => {
              let notifMap = snapshot.val();

              this.items.forEach(item => {
                  if (notifMap[item.id]) {
                      item.notifs = notifMap[item.id].chat_notifs;
                  }
              });
          });

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
          if (contact.hidden && this.content.ibcFB.access_level < 3) return false;
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
          type: TypeInputUI.Dropdown,
          lookupSource: this.content.allContacts$.map(contacts => contacts.filter(contact => contact.class != 'group' && !contact.hidden)),
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
      definitions: this.templateForAdd,
      cancel: () => popupModal.dismiss(),
      save: (data: any) => {
        console.log(JSON.stringify(data,null,2));

        /* Check whether username already exists */
        if (this.allContacts.filter(c => c.username == data.username).length > 0) {
          this.commonSvc.toastFailure(`${data.username}已被占用，请换一个username`);
          return;
        }

        let lastId = this.lastCounts && this.lastCounts.contacts;

        console.log(`lastId = ${lastId}`);

        if (lastId && data && data.name) {
          let newId = lastId + 1;
          Promise.all([
            this.content.allContactsDB.child(newId).set({
              username: data.username,
              id: newId,
              name: data.name,
              chinese_name: data.chinese_name,
              skills: data.skills || [],
              email: data.email || `${data.username}@unknown.com`,
              mobile: data.mobile,
              address1: data.address1,
              state: data.state,
              postcode: data.postcode,
              class: data.class,
              hidden: data.hidden,
              createDT: moment().format("YYYY-MM-DD HH:mm:ss")
            }),
            this.content.lastCountDB.child('contacts').set(newId)
          ])
          .then(res => {
            return this.ibcHttp.post('user', {
              name: data.username,
              access_level: 1,
              email: data.email || `${data.username}@unknown.com`
            });
          })
          .then((res) => {
            console.log(res);
            this.commonSvc.toastSuccess(`添加成功! 用户名：${res.name} 密码：${res.password}`, 300000);
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
      let contact = this.allContacts.filter(c => c.id == id)[0];
      if (!contact) {
          this.commonSvc.toastFailure(`无法找到与${id}匹配的记录`);
          return;
      }
      this.content.allContactsDB.child(id).remove()
      .then(res => {
        return this.ibcHttp.delete('user', {
            name: contact.username
        });
      })
      .then(() => {
        this.commonSvc.toastSuccess('删除成功');
      }, err => {
        this.commonSvc.toastFailure('删除失败', err);
      });
    });
  }

  editContact(contact: IntContact): void {
    let popupModal = this.modalCtrl.create(PopupComponent, { 
      title: this.title,
      definitions: this.templateForAdd || [],
      item: contact,
      cancel: () => popupModal.dismiss(),
      save: (item) => {
          this.content.allContactsDB.child(`${contact.id}`).set(contact).then(() => {
              this.commonSvc.toastSuccess('编辑成功');
              popupModal.dismiss();
          }, err => {
              this.commonSvc.toastFailure('编辑失败', err);
              this.items.pop();
              popupModal.dismiss();
          });

      }
    });
    popupModal.present();
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
    this.navCtrl.push(MapPage, {
      title: `${item.name}的家`,
      address: `${item.address1} ${item.address2} ${item.province} ${item.state} ${item.postcode}`
    });
    // this.navLauncher.navigate(`${item.address1} ${item.address2} ${item.province} ${item.state} ${item.postcode}`).then(() => {
    // }, console.error);
  }

}

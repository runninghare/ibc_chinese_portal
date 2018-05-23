import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { Observable, Subscription } from 'rxjs';
import { S2tProvider } from '../s2t/s2t';
import { VideoProvider } from '../video/video';
import * as moment from 'moment';
import { Badge } from '@ionic-native/badge';
import { ENV } from '@app/env';

export interface IntSummaryData {
    id?: any;
    title?: any;
    subtitle?: any;
    avatar?: any;
    thumbnail?: any;
    content?: any;
    redirect?: any;
    hyperlink?: any;
    datetime?: any;
    location?: any;
    callFunc?: any;
    lookupFunc$?: any;
    lookupKey?: any;
    lookupValue?: any;
}

export interface IntListItem {
    id?: number|string;        // Identification of this list item
    sender?: string;      // contactId as sender, used by the task-type list item
    key?: string;       // key of this item, used by the task or question type of list item, which tracks the same task being sent back and forth
    value?: any;        // value of this item, used by the task or question type of list item, which tracks the same task being sent back and forth
    answer?: any;        // answer of the question item, used by the question-type list item, which tracks the same task being sent back and forth
    title?: string;     // Title
    subtitle?: string;  // Subtitle as description of this list item
    thumbnail?: string; // thumbnail picture
    content?: string;   // content of this list item, used by activity list item
    redirect?: string;  // This is the Page component being directed when user clicks this item 
    params?: any;    // This is the NavParams sent by Nav Controller while redirecting to Page Component
    hyperlink?: string; // This is the hyperlink being directed when user clicks this item
    createDT?: string;  // Created datetime of this item
    read?: boolean;     // Whether it has been read, used by the task-type list item
    isNew?: boolean;    // Whether it has been clicked, used by the task-type list item
    popUpQuestion?: IntPopupTemplateItem;  // Popup question, used by the task-type list item
    datetime?: string;
    location?: string;
    longitude?: number;
    latitude?: number;
    createdDT?: string;
}

export interface IntHomeCard {
    title?: string;
    subtitle?: string;
    thumbnail?: string;
    content?: string;
    redirect?: string;
    hyperlink?: string;
    notifCount?: number;
    badgeCount?: string;
}

export interface IntContact {
    id?: string;
    name?: string;
    chinese_name?: string;
    dob?: string;
    photoURL?: string;
    email?: string;
    mobile?: string;
    address1?: string;
    address2?: string;
    province?: string;
    state?: string;
    country?: string;
    postcode?: string;
    wechat?: string;
    skills?: string[];
    visited?: boolean;
    class?: string;
    myFriends?: any;
    tasks?: any; 
    notifs?: number;
    createDT?: string;
    updateDT?: string;
}

export interface IntUserMapValue {
    contactId: string;
    threads: any;
}

export interface IntUrlModifier {
    regex: string;
    code?: string;
    css?: string;
}

export interface IntMinistrySheet {
    id?: number;
    date?: string;
    leader?: IntContact;
    preacher?: IntContact;
    interpreter?: IntContact;
    choir1?: IntContact;
    choir2?: IntContact;
    assistant1?: IntContact;
    assistant2?: IntContact;
    technician?: IntContact;
    music?: IntContact;
    confirm?: any;
}

export enum TypeInputUI {
    Number = 'number',
    Text = 'text',
    Textarea = 'textarea',
    Boolean = 'boolean',
    Date = 'date',
    Location = 'location',
    Dropdown = 'dropdown',
    MultiDropdown = 'multi-dropdown'
}

export interface IntPopupTemplateItem {
    caption?: string;
    key?: string;
    type?: TypeInputUI;
    lookupSource?: Observable<any[]> | string;
    lookupCaption?: string;
    lookupValue?: any;
    required?: boolean;
    default?: any;
    hidden?: any;
    notifications?: IntListItem[];
    recipient?: string;
    groupByFunc?(val: any, key?: string): string;
    handlerFunc?(any): void;
}

export interface IntListPageParams {
    title?: string;
    itemsDB?: firebase.database.Reference;
    items$?: Observable<any[]>;
    itemKey?: string;
    templateForAdd?: IntPopupTemplateItem[];
    fullPermission?: boolean;
    groupBy?: string;
    checkNew?: boolean;
    hideEdit?: boolean;
    hideDelete?: boolean;
    listHasKeys?: boolean;
    subtitleAs?: string | ((any) => string);
    filterFunc?(text:string, item:any): boolean; 
    mapFunc?(item:any): any; 
    reverseMapFunc?(item:any): any;
    callFunc?(item:any): void; 
    orderByFunc?(a: any, b: any): number;
    groupOrderByFunc?(a: any, b: any): number;
}

export interface IntActParticipant {
    userId: any;
    comment: any;
}

export interface IntActivity extends IntSummaryData {
    key?: string;
    past?: boolean;
    summary?: string;
    description?: string;
    participants?: IntActParticipant[];
    pictures?: string[];
    question?: string;
    questionKey?: string;
    questionType?: TypeInputUI;
    answerChoices?: string;
    chatId?: number;
}

export interface IntMessage {
  sender: number|string;
  timestamp: string;
  body: string;
}

export interface IntThread {
  type: 'private'|'public'|'group';
  participants: any;
  messages: IntMessage[];
}

export interface IntCache {
  key: string;
  timestamp: Date;
}

export interface IntUserStatus {
  chat_active: boolean;
}

export {database} from 'firebase/app';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    auth: firebase.User;
    myselfContact: IntContact;
    myselfContactDB: firebase.database.Reference;

    currentUser$: Observable<IntContact>;

    homeCardsDB: firebase.database.Reference;
    homeCards$: Observable<IntHomeCard[]>;    
    homeCards: IntHomeCard[] = [];

    urls: any = {};

    urlPageAdjustments$: Observable<IntUrlModifier[]>;
    urlPageAdjustments: IntUrlModifier[] = [];

    activitiesDB: firebase.database.Reference;
    activities$: Observable<IntListItem[]>;
    // activities:  IntListItem[] = [];
    activitiesParams: IntListPageParams;

    songsDB: firebase.database.Reference;
    songs$: Observable<IntListItem[]>;
    fullSongPageParams: IntListPageParams;

    nextServiceSongsDB: firebase.database.Reference;
    nextServiceSongs$: Observable<IntListItem[]>;
    nextSongPageParams: IntListPageParams;

    beliefUrlsDB: firebase.database.Reference;
    beliefUrls$: Observable<IntListItem[]>;
    beliefUrlsParams: IntListPageParams;

    myTasksDB: firebase.database.Reference;
    myTasks$: Observable<IntListItem[]>;
    // myTasks:  IntListItem[];
    myTasksParams: IntListPageParams;    

    allContacts: IntContact[] = [];
    allContactsDB: firebase.database.Reference;
    allContacts$: Observable<IntContact[]>;
    allContactsParams: IntListPageParams;

    ministriesDB: firebase.database.Reference;
    ministries$: Observable<IntMinistrySheet[]>;    

    existingSubscriptions: Subscription[] = [];

    threadDB: firebase.database.Reference;

    fileCache$: Observable<IntCache[]>;

    lastCounts$: Observable<any>;
    lastCountDB: firebase.database.Reference;

    allStatusDB: firebase.database.Reference;
    allStatus$: Observable<{[index: string]: IntUserStatus}>;

    errorObservableHandler = err => {
        console.log(err);
        this.cleanDataWithAuth();
        return Observable.empty();
    }

    userAuthHandler(): void {
        this.currentUser$ = this.ibcFB.userProfile$.filter(u => u != null).flatMap(authUser => {
            this.auth = authUser;

            /* Update Auth User profile we have it in auth.providedData */
            if ((!authUser.displayName || !authUser.photoURL) && authUser.providerData && authUser.providerData[0]) {
                this.ibcFB.updateAuthUserProfile(authUser, authUser.providerData[0].displayName, authUser.providerData[0].photoURL);
            }

            /* Update access_level of ibcFB */
            this.ibcFB.afDB.database.ref('roles/superuser').once('value').then(val => {
                console.log("You are a superuser!");
                this.ibcFB.access_level = 3;
            })
                .catch(err => this.ibcFB.afDB.database.ref('roles/admin').once('value').then(val => {
                    console.log("You are an admin!");
                    this.ibcFB.access_level = 2;
                }))
                .catch(err => this.ibcFB.afDB.database.ref('roles/internal').once('value').then(val => {
                    console.log("You are an internal user!");
                    this.ibcFB.access_level = 1;
                }))
                .catch(err => {
                    this.ibcFB.access_level = 0;
                });

            return this.ibcFB.afDB.object<IntUserMapValue>(`userMap/${authUser.uid}`).valueChanges().flatMap(res => {
                this.myselfContactDB = this.ibcFB.afDB.database.ref(`contacts/${res.contactId}`);
                return this.ibcFB.afDB.object<IntContact>(`contacts/${res.contactId}`).valueChanges()
            }).catch(this.errorObservableHandler);
        }).catch(this.errorObservableHandler);

        this.currentUser$.subscribe(contact => {
            console.log("--- current contact ---");
            console.log(contact);
            this.myselfContact = contact;

            if (!contact.photoURL && this.auth.providerData[0] && this.auth.providerData[0].photoURL) {
                this.myselfContactDB.update({ photoURL: this.auth.providerData[0].photoURL });
            }

            /* Update email & displayName property of auth using the info from /users (firebase DB) */
            if (!this.auth.email) {
                this.ibcFB.updateAuthUserEmail(this.auth, contact.email);
            }

            if (!this.auth.displayName) {
                this.ibcFB.updateAuthUserProfile(this.auth, contact.name, '');
            }

            this.myTasksDB = this.ibcFB.afDB.database.ref(`tasks/${contact.id}`);
            this.myTasks$ = this.ibcFB.afDB.list<IntListItem>(`tasks/${contact.id}`).valueChanges();
            this.myTasksParams = {
                title: '我的任務',
                items$: this.myTasks$,
                itemsDB: this.myTasksDB,
                checkNew: true,
                hideEdit: false,
                listHasKeys: true,
                fullPermission: true,
                subtitleAs: (item) => {
                  return moment(item.createdDT).format('M月D日 HH:mm:ss 发送');
                },
                orderByFunc: (a,b) => {
                  // let newA = !a.isNew || 0;
                  // let newB = !b.isNew || 0;
                  // let readA = a.read || 0;
                  // let readB = b.read || 0;
                  let timeA = a.datetime || "2100-01-01";
                  let timeB = b.datetime || "2100-01-01";
                  let createdTimeA = a.createdDT || '2000-01-01 00:00:00';
                  let createdTimeB = b.createdDT || '2000-01-01 00:00:00';   
                  // return newA < newB ? -1 : newA > newB ? 1 : 
                  //        readA < readB ? -1 : readA > readB ? 1 : 
                  return timeA < timeB ? -1 : timeA > timeB ? 1 :
                         createdTimeA < createdTimeB ? 1 : createdTimeA > createdTimeB ? -1 : 0
                },
                templateForAdd: [
                    {
                        key: 'title',
                        caption: '標題'
                    },
                    {
                        key: 'subtitle',
                        caption: '描述'
                    },
                    {
                        key: 'redirect',
                        caption: '链接页面'
                    },
                    {
                        key: 'datetime',
                        caption: '日期时间',
                        type: TypeInputUI.Date
                    }
                ]
            };

            this.initSubscribeWithAuth();

        }, this.errorObservableHandler);
    }

    initSubscribeWithAuth(): void {

      while (this.existingSubscriptions.length > 0) {
        let subscription = this.existingSubscriptions.pop();
        if (subscription) {
          subscription.unsubscribe();
        }
      }

      this.existingSubscriptions.push(this.allContacts$.subscribe(contacts => {
        this.allContacts = contacts;
        contacts.forEach(contact => {
          if (contact.photoURL) {
            this.cacheSvc.cacheFile(contact.photoURL, 'image').then(url => {
              // cache all photoURLs
              // console.log(JSON.stringify(this.cacheSvc.cachingMap[contact.photoURL]));
            });
          }
        })
      }, console.error));

      this.existingSubscriptions.push(this.homeCards$.subscribe(cards => {
          this.homeCards = cards;
          let content = this;

          if (content) {} // A trick to avoid tslint warning.

          this.homeCards.forEach(card => {
              try {
                  let list$: Observable<number> = eval(card.badgeCount);
                  this.existingSubscriptions.push(list$.subscribe(count => {
                    card.badgeCount = `${count}`;
                  }, err => {}));
              } catch (e) { }
          })
      }, console.error));

      // this.existingSubscriptions.push(this.activities$.subscribe(activities => {
      //   this.activities = activities;
      // }, console.error));

      // this.existingSubscriptions.push(this.myTasks$.subscribe(tasks => {
      //   this.myTasks = tasks;
      //     if (!tasks) tasks = [];
      //     let newCount = tasks.filter(task => task.isNew).length;

      //     setTimeout(() => {
      //         this.badge.set(newCount);
      //         let taskCardIndex = this.homeCards && this.homeCards.map(card => card.redirect).indexOf('TaskPage');
      //         this.homeCards[taskCardIndex].notifCount = newCount;
      //     }, 500);

      // }, console.error));

    }

    cleanDataWithAuth(): void {
      this.allContacts = [];
      this.myselfContact = null;
      this.ibcFB.access_level = 0;
    }

    constructor(public http: HttpClient, public ibcFB: IbcFirebaseProvider, public badge: Badge,
        public s2t: S2tProvider, public videoSvc: VideoProvider, public cacheSvc: FileCacheProvider) {

        window['ENV'] = ENV;
        console.log(`======= RUNNING MODE: ${ENV.mode} ========`);

        this.userAuthHandler();

        this.homeCardsDB = this.ibcFB.afDB.database.ref('homecards');
        this.homeCards$ = this.ibcFB.afDB.list<IntHomeCard>('homecards').valueChanges();

        this.beliefUrlsDB = this.ibcFB.afDB.database.ref('beliefs');
        this.beliefUrls$ = this.ibcFB.afDB.list<IntListItem>('beliefs').valueChanges();
        this.beliefUrlsParams = {
          title: '關於信仰',
          items$: this.beliefUrls$,
          itemsDB: this.beliefUrlsDB,
          templateForAdd: [
              {
                  key: 'title',
                  caption: '標題'
              },
              {
                  key: 'subtitle',
                  caption: '描述'
              },
              {
                  key: 'hyperlink',
                  caption: '超鏈接'
              }
          ]
        };

        this.songsDB = this.ibcFB.afDB.database.ref('songs');
        this.songs$ = this.ibcFB.afDB.list<IntListItem>('songs').valueChanges();
        this.fullSongPageParams = {
            title: '贊美詩歌',
            items$: this.songs$,
            itemsDB: this.songsDB,
            templateForAdd: [
              {
                  key: 'id',
                  caption: 'Youtube ID'
              },
              {
                  key: 'name',
                  caption: '歌名'
              },
              {
                  key: 'set',
                  caption: 'Set'
              }
            ],
            filterFunc: (val, item) => {
                if (!isNaN(<any>val)) {
                    return item.set == val;
                } else {
                    return `${item.name}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
                }
            },
            mapFunc: (item) => {
                return {
                    id: item.id,
                    title: item.name,
                    set: item.set,
                    thumbnail: 'https://img.youtube.com/vi/' + item.id + '/0.jpg',
                    callFunc: true
                }
            },
            groupBy: 'set',
            callFunc: (item) => {
                this.videoSvc.play(item.id);
            }
        };

        this.nextServiceSongsDB = this.ibcFB.afDB.database.ref('nextServiceSongs');
        this.nextServiceSongs$ = Observable.combineLatest(this.songs$, this.ibcFB.afDB.list<IntListItem>('nextServiceSongs').valueChanges()).map(res => {
            let _songList = res[0];
            let _nextSongStrings = res[1];
            return _songList.filter(s => _nextSongStrings.filter(nss => nss == s.id).length > 0);
        });
        this.nextSongPageParams = Object.assign({}, this.fullSongPageParams, {
            title: '本周贊美詩歌',
            itemsDB: this.nextServiceSongsDB,
            items$: this.nextServiceSongs$,
            reverseMapFunc: (item) => item.id,
            templateForAdd: [
              {
                  key: 'id',
                  caption: 'Youtube ID',
                  type: 'dropdown',
                  lookupSource: this.songs$,
                  lookupCaption: 'name',
                  lookupValue: 'id'
              },
            ]
        });

        this.allContactsDB = this.ibcFB.afDB.database.ref('contacts');
        this.allContacts$ = this.ibcFB.afDB.list<IntContact>('contacts').valueChanges().catch(err => Observable.of(null)).map(contacts => {
          if (!contacts) return [];
          return contacts.sort((a, b) => {
            let classA = a.class || 'user';
            let classB = b.class || 'user';
            return classA < classB ? -1 : classA > classB ? 1 : (a.name < b.name ? -1 : 1);
          });
        });

        this.activitiesDB = this.ibcFB.afDB.database.ref('activities');
        this.activities$ = this.ibcFB.afDB.list<IntListItem>('activities').valueChanges();
        this.activitiesParams = {
          title: '教會活動',
          items$: this.activities$,
          itemsDB: this.activitiesDB,
          checkNew: true,
          groupBy: 'past',
          groupOrderByFunc: (a,b) => (a?1:0) < (b?1:0) ? -1 : 1,
          orderByFunc: (a,b) => a.datetime > b.datetime ? -1 : 1, 
          templateForAdd: [
              {
                  key: 'title',
                  caption: '標題'
              },
              {
                  key: 'description',
                  caption: '描述',
                  type: TypeInputUI.Textarea
              },              
              {
                  key: 'datetime',
                  caption: '日期',
                  type: TypeInputUI.Date
              },
              {
                  key: 'location',
                  caption: '地點',
                  type: TypeInputUI.Text
              },
              {
                  key: 'redirect',
                  default: 'ActivityPage',
                  hidden: true
              },
              {
                  key: 'past',
                  groupByFunc: (val) => {
                      return val ? '過去的活動' : '新活動';
                  },
                  caption: '這是舊的活動',
                  type: TypeInputUI.Boolean,
                  default: false,
              },
              {
                  key: 'question',
                  caption: '需要参加者填写的问题'
              },
              {
                  key: 'questionType',
                  caption: '问题类型',
                  type: TypeInputUI.Dropdown,
                  hidden: act => !act.question,
                  lookupSource: Observable.of([
                      {
                          val: TypeInputUI.Boolean,
                          cap: '回答Yes或No'
                      },
                      {
                          val: TypeInputUI.Dropdown,
                          cap: '選擇題'
                      },
                      {
                          val: TypeInputUI.Text,
                          cap: '需要具體輸入'
                      }                      
                  ]),
                  lookupCaption: 'cap',
                  lookupValue: 'val'                  
              },  
              {
                  key: 'answerChoices',
                  caption: '問答選項（請用逗號分隔）',
                  hidden: (act) => act.questionType != TypeInputUI.Dropdown
              },
              {
                  key: 'thumbnail',
                  caption: '縮略圖'
              }
          ],
          mapFunc: (item) => {
                return {
                    id: item.id,
                    title: item.title,
                    subtitle:  moment(item.datetime).format('YYYY年M月D日'),
                    datetime:  item.datetime,
                    thumbnail: item.thumbnail,
                    redirect: item.redirect,
                    isNew: item.isNew
                }
            },
        };

        /* public URLs */
        this.ibcFB.afDB.database.ref('urls').on('value', snapshot => {
          this.urls = snapshot.val();
        });

        this.urlPageAdjustments$ = this.ibcFB.afDB.list<IntUrlModifier>('urlPageAdjustments').valueChanges();
        this.existingSubscriptions.push(this.urlPageAdjustments$.subscribe(res => {
          this.urlPageAdjustments = res;
        }, err => { }));

        this.ministriesDB = this.ibcFB.afDB.database.ref('ministries');
        this.ministries$ = this.ibcFB.afDB.list<IntMinistrySheet>('ministries').valueChanges();

        this.threadDB = this.ibcFB.afDB.database.ref('threads');
        this.fileCache$ = this.ibcFB.afDB.list<IntCache>('updateCaches').valueChanges();

        this.fileCache$.subscribe(caches => {
          caches.forEach(c => {
            this.cacheSvc.checkAndClearCache(c.key, new Date(c.timestamp));
          });
        }, console.error);      

        this.lastCountDB = this.ibcFB.afDB.database.ref('lastCounts');
        this.lastCounts$ = this.ibcFB.afDB.object('lastCounts').valueChanges();

        this.allStatusDB = this.ibcFB.afDB.database.ref('status');
        this.allStatus$ = <Observable<any>>this.ibcFB.afDB.object('status').valueChanges();
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { S2tProvider } from '../s2t/s2t';
import { VideoProvider } from '../video/video';
import * as moment from 'moment';
import { Badge } from '@ionic-native/badge';
import { ModalController, NavController, NavParams, Modal } from 'ionic-angular';
import { ENV } from '@app/env';
import { Platform } from 'ionic-angular';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { WechatProvider } from '../../providers/wechat/wechat';
import { CommonProvider } from '../../providers/common/common';
import { ListPage } from '../../pages/list/list';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';

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
    id?: number | string;        // Identification of this list item
    sender?: string;      // contactId as sender, used by the task-type list item
    key?: string;       // key of this item, used by the task or question type of list item, which tracks the same task being sent back and forth; key is also used for selection;
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
    selected?: boolean;
}

export interface IntHomeCard {
    title?: string;
    subtitle?: string;
    thumbnail?: string;
    content?: string;
    redirect?: string;
    params?: string;
    isHidden?: boolean;
    hyperlink?: string;
    isNew?: boolean;
    badgeCount?: string; // This is an eval string which can be executed. e.g. to return new activity numbers:
                         // content.activities$.map(function(items) {return items.filter(function(item) {return item.isNew}).length})
    sortOrder?: number;
}

export interface IntContact {
    id?: string;
    username?: string;
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
    shareInfo?: boolean;
    class?: string;
    myFriends?: any;
    tasks?: any;
    notifs?: number;
    hidden?: boolean;
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

export interface IntUserGroup {
    id?: string;
    groupName?: string;
    groupDescription?: string;
    title?: string;
    members?: string[];
    avatar?: string;
    hidden?: boolean;
    createDT?: string;
    updateDT?: string;
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
    default?: any;  // could be a function
    hidden?: any;
    disabled?: any;
    notifications?: IntListItem[];
    recipient?: string;
    groupByFunc?(val: any, key?: string): string;
    handlerFunc?(any): void;
}

export interface IntAuxiliaryButton {
    getTitle?(item: any, auxiliaryItems: any[]): string;
    click?(item: any, auxiliaryItems: any[]): void;
    getColor?(item: any, auxiliaryItems: any[]): string;
    getAuxiliaryDB?(): firebase.database.Reference;
    exists?(item: any, auxiliaryItems: any[]): boolean;
};

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
    titleAs?: string | ((item?: any, auxiliaryItems?: any[]) => string);
    subtitleAs?: string | ((item?: any, auxiliaryItems?: any[]) => string);
    filterFunc?(text: string, item: any): boolean;
    mapFunc?(item: any, index?: number): any;
    reverseMapFunc?(item: any): any;
    callFunc?(item: any): void;
    orderByFunc?(a: any, b: any): number;
    groupOrderByFunc?(a: any, b: any): number;
    additionalSlideButton?: IntAuxiliaryButton;
    postAddCallback?(item: any, keyOrIndex: any): Promise<any>;
    postDeleteCallback?(item: any, keyOrIndex: any): Promise<any>;
    defaultAvatarImg?: string;
    defaultThumbnailImg?: string;
    preselectedItemKeys?: string[];
    itemTappedPreFunc?(item?: any, index?: any): void;
    forSelection?: boolean;
    selectFunc?(item: any): void;  /* Most of time we use modal.OnDidDismiss() so this prop is no longer necessary */
    addItemUseComponent?: string;
    addItemFuncFactory?(modalCtrl: ModalController, component: any): () => void;
    noSlideOptions?: boolean;
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
    videos?: { title?: string, youtubeId?: string }[];
    question?: string;
    questionKey?: string;
    questionType?: TypeInputUI;
    answerChoices?: string;
    chatId?: number;
}

export interface IntSermon extends IntSummaryData {
    type?: 'video' | 'audio';
    description?: string;
    chatId?: any;
}

export interface IntMessage {
    sender: number | string;
    timestamp: string;
    body: string;
}

export interface IntThread {
    type: 'private' | 'public' | 'group';
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

export { database } from 'firebase/app';

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
    homeCardsParams: IntListPageParams;

    urls: any = {};

    urlPageAdjustments$: Observable<IntUrlModifier[]>;
    urlPageAdjustments: IntUrlModifier[] = [];

    activitiesDB: firebase.database.Reference;
    activities$: Observable<IntListItem[]>;
    // activities:  IntListItem[] = [];
    activitiesParams: IntListPageParams;
    contactsParams: IntListPageParams;

    songsDB: firebase.database.Reference;
    songs$: Observable<IntListItem[]>;
    fullSongPageParams: IntListPageParams;

    nextServiceSongsDB: firebase.database.Reference;
    nextServiceSongs$: Observable<IntListItem[]>;
    nextSongPageParams: IntListPageParams;

    sermonsDB: firebase.database.Reference;
    sermons$: Observable<IntSermon[]>;
    sermonPageParams: IntListPageParams;

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
    allStatus$: Observable<{ [index: string]: IntUserStatus }>;

    userManagementParams: IntListPageParams;

    groupManagement$: Observable<IntUserGroup[]>;
    groupManagementDB: firebase.database.Reference;
    groupManagementParams: IntListPageParams;

    tempListPageParams: IntListPageParams;

    versionDB: firebase.database.Reference;

    errorObservableHandler = err => {
        console.log(err);
        this.cleanDataWithAuth();
        return Observable.empty();
    }

    userAuthHandler(): void {
        this.currentUser$ = this.ibcFB.userProfile$.filter(u => u != null).flatMap(authUser => {
            this.auth = authUser;
            this.ibcFB.userProfile = authUser;

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
                    console.log('--- no access_level ---');
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

            if (!contact.photoURL && this.ibcFB.wechatAuthInfo.headimgurl) {
                this.myselfContactDB.update({ photoURL: this.ibcFB.wechatAuthInfo.headimgurl });
            }

            if (this.ibcFB.wechatAuthInfo.nickname) {
                this.myselfContactDB.update({ wechat: this.ibcFB.wechatAuthInfo.nickname });
            }

            /* Update email & displayName property of auth using the info from /users (firebase DB) */
            // if (!this.auth.email) {
            //     this.ibcFB.updateAuthUserEmail(this.auth, contact.email);
            // }

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
                orderByFunc: (a, b) => {
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

            if (content) { } // A trick to avoid tslint warning.

            this.homeCards.forEach(card => {
                try {
                    let list$: Observable<number> = eval(card.badgeCount);
                    this.existingSubscriptions.push(list$.subscribe(count => {
                        card.badgeCount = `${count}`;
                    }, err => { }));
                } catch (e) { }
            })
        }, console.error));

        /* At this time we are not going to use badge because it only gets updated when
           the app is open and running which is not very useful. */

        // this.existingSubscriptions.push(this.myTasks$.subscribe(tasks => {
        //   if (tasks) {
        //     let newTaskCount = tasks.filter(t => t.isNew).length;
        //     console.log(`newTaskCount = ${newTaskCount}`);
        //     if (!newTaskCount) {
        //       this.badge.clear();
        //     } else {
        //       this.badge.set(newTaskCount);
        //     }
        //   }
        // }, e => {}));

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

    allowWechat: boolean = false;

    createAddChatIdFunc = (title, db) => (item, key) => {
        return this.lastCountDB.once('value').then(snapshot => {
            let lastCount = snapshot.val();

            let newId = lastCount.contacts + 1;

            return Promise.all([
                this.allContactsDB.child(`${newId}`).set({
                    id: newId,
                    name: title,
                    chinese_name: item.title,
                    skills: [],
                    class: 'group',
                    hidden: true,
                    createDT: moment().format("YYYY-MM-DD HH:mm:ss")
                }),
                this.lastCountDB.child('contacts').set(newId).then(() => item)
            ]).then(() => {
                return db.child(`${key}`).child('chatId').set(newId);
            });
        })
    };

    createRemoveChatIdFunc = (item) => {
        let chatId = item.chatId;
        if (chatId) {
          return this.allContactsDB.child(`${chatId}`).remove();
        } else {
          return Observable.of(null).toPromise();
        }
    };

    constructor(public http: HttpClient, public ibcFB: IbcFirebaseProvider, public badge: Badge, public wechat: WechatProvider, public platform: Platform,
        public s2t: S2tProvider, public videoSvc: VideoProvider, public cacheSvc: FileCacheProvider, public modalCtrl: ModalController, public commonSvc: CommonProvider) {

        window['ENV'] = ENV;
        console.log(`======= RUNNING MODE: ${ENV.mode} ========`);

        if (this.platform.is('ios')) {
            setTimeout(() => {
                this.wechat.wechatInstalled().then(() => {
                    this.ibcFB.afDB.database.ref('allowWechat').on('value', snapshot => {
                        let val = snapshot.val();
                        this.allowWechat = val;
                        // alert(this.allowWechat);
                    });
                }, () => {
                    this.allowWechat = false;
                });
            }, 1000);
        } else if (this.platform.is('android')) {
            this.allowWechat = true;
        } else {
            this.allowWechat = false;
        }

        // setTimeout(() => {
        //   this.badge.clear();
        // }, 1000);

        this.userAuthHandler();

        this.homeCardsDB = this.ibcFB.afDB.database.ref('homecards');
        this.homeCards$ = this.ibcFB.afDB.list<IntHomeCard>('homecards').valueChanges();
        this.homeCardsParams = {
            title: '首页卡片',
            items$: this.homeCards$,
            itemsDB: this.homeCardsDB,
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
                },
                {
                    key: 'thumbnail',
                    caption: '縮略圖',
                },
                {
                    key: 'isHidden',
                    caption: '隐藏',
                    type: TypeInputUI.Boolean,
                    default: false
                },
                {
                    key: 'sortOrder',
                    caption: '顺序',
                    type: TypeInputUI.Number,
                    default: 0
                },
                {
                    key: 'isNew',
                    caption: '显示最新',
                    type: TypeInputUI.Boolean,
                    default: false
                },
                {
                    key: 'redirect',
                    caption: '重定向頁面',
                    hidden: card => card.hyperlink,
                    type: TypeInputUI.Dropdown,
                    lookupSource: Observable.of([
                        {
                            val: null,
                            cap: 'N/A'
                        },
                        {
                            val: 'list-page',
                            cap: '列表頁面'
                        },
                        {
                            val: 'song-page',
                            cap: '詩歌頁面'
                        },
                        {
                            val: 'activity-page',
                            cap: '活動頁面'
                        },
                        {
                            val: 'task-page',
                            cap: '任務頁面'
                        },
                        {
                            val: 'ministry-page',
                            cap: '侍奉人員頁面'
                        },
                        {
                            val: 'chat-page',
                            cap: '討論頁面'
                        }
                    ]),
                    lookupCaption: 'cap',
                    lookupValue: 'val'
                },
                {
                    key: 'params',
                    caption: '重定向参数（高级）',
                    type: TypeInputUI.Dropdown,
                    hidden: card => !card.redirect || card.redirect != 'list-page',
                    lookupSource: Observable.of([
                        {
                            val: '{"type":"fullSongPageParams"}',
                            cap: '全部詩歌列表'
                        },
                        {
                            val: '{"type":"nextSongPageParams"}',
                            cap: '本週敬拜詩歌列表'
                        },
                        {
                            val: '{"type":"myTasksParams"}',
                            cap: '我的任務列表'
                        },
                        {
                            val: '{"type":"activitiesParams"}',
                            cap: '活動列表'
                        }
                    ]),
                    lookupCaption: 'cap',
                    lookupValue: 'val'
                },
                {
                    key: 'params',
                    caption: '重定向参数（高级）',
                    hidden: card => !card.redirect || card.redirect == 'list-page',
                },
                {
                    key: 'content',
                    caption: '內容（高级）',
                    type: TypeInputUI.Textarea
                },
                {
                    key: 'badgeCount',
                    caption: '提醒計數（高級）'
                }
            ]
        };

        // export interface IntHomeCard {
        //     title?: string;
        //     subtitle?: string;
        //     thumbnail?: string;
        //     content?: string;
        //     redirect?: string;
        //     hyperlink?: string;
        //     notifCount?: number;
        //     badgeCount?: string;
        // }        

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
                    caption: 'Set',
                    groupByFunc: (val, key) => {
                        if (val == 0) {
                            return '保留詩歌';
                        } else {
                            return `${key} ${val}`;
                        }
                    }
                },
                {
                    key: 'album',
                    caption: '专辑'
                },
                {
                    key: 'lyric',
                    caption: '歌詞',
                    type: TypeInputUI.Textarea
                },
                {
                    key: 'language',
                    caption: '语言',
                    type: TypeInputUI.Dropdown,
                    lookupSource: Observable.of([
                        {
                            val: '國語',
                            cap: '國語'
                        },
                        {
                            val: '粵語',
                            cap: '粵語'
                        },
                        {
                            val: '英語',
                            cap: '英語'
                        }
                    ]),
                    lookupCaption: 'cap',
                    lookupValue: 'val'
                },
            ],
            filterFunc: (val, item) => {
                if (!isNaN(<any>val)) {
                    return item.set == val;
                } else {
                    return `${item.name}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
                }
            },
            subtitleAs: (item, auxiliaryItems) => {
                let index = auxiliaryItems.indexOf(item.id);
                if (index > -1) {
                    return '本週贊美詩歌'
                } else {
                    return null;
                }
            },
            mapFunc: (item) => {
                return {
                    id: item.id,
                    title: item.name,
                    set: item.set,
                    thumbnail: 'https://img.youtube.com/vi/' + item.id + '/0.jpg',
                    redirect: 'song-page',
                    params: {
                        id: item.id,
                        album: item.album,
                        title: item.name,
                        set: item.set,
                        lyric: item.lyric,
                        language: item.language
                    }
                }
            },
            groupBy: 'set',
            groupOrderByFunc: (a, b) => {
                return parseInt(a) < parseInt(b) ? -1 : 1;
            },
            additionalSlideButton: {
                getAuxiliaryDB: () => this.nextServiceSongsDB,
                exists: (item, auxiliaryItems) => {
                    let index = auxiliaryItems.indexOf(item.id);
                    if (index > -1) {
                        return true
                    } else {
                        return false;
                    }
                },
                getColor: (item, auxiliaryItems) => {
                    let index = auxiliaryItems.indexOf(item.id);
                    if (index > -1) {
                        return 'danger'
                    } else {
                        return 'teal-1'
                    }
                },
                getTitle: (item, auxiliaryItems) => {
                    let index = auxiliaryItems.indexOf(item.id);
                    if (index > -1) {
                        return '删除本周赞美'
                    } else {
                        return '添加为本周赞美'
                    }
                },
                click: (item, auxiliaryItems) => {
                    let index = auxiliaryItems.indexOf(item.id);
                    if (index > -1) {
                        auxiliaryItems.splice(index, 1);
                    } else {
                        auxiliaryItems.push(item.id);
                    }
                    this.nextServiceSongsDB.set(auxiliaryItems).then(() => {
                        this.commonSvc.toastSuccess('本週贊美詩已更新');
                    }, err => {
                        this.commonSvc.toastFailure('本週贊美詩更新失敗', err);
                    })
                }
            }
            // callFunc: (item) => {
            //     this.videoSvc.play(item.id);
            // }
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

        this.sermonsDB = this.ibcFB.afDB.database.ref('sermons');
        this.sermons$ = this.ibcFB.afDB.list<IntSermon>('sermons').valueChanges();
        this.sermonPageParams = {
            title: '教會講道',
            items$: this.sermons$,
            itemsDB: this.sermonsDB,
            templateForAdd: [
                {
                    key: 'id',
                    caption: 'YoutubeID (Audio可不填)'
                },
                {
                    key: 'type',
                    caption: '媒体类型',
                    type: TypeInputUI.Dropdown,
                    lookupSource: Observable.of([
                        {
                            val: 'video',
                            cap: 'Youtube视频'
                        },
                        {
                            val: 'audio',
                            cap: '音频'
                        }
                    ]),
                    lookupCaption: 'cap',
                    lookupValue: 'val'
                },
                {
                    key: 'title',
                    caption: '标题'
                },
                {
                    key: 'subtitle',
                    caption: '副标题'
                },
                {
                    key: 'description',
                    caption: '介绍',
                    type: TypeInputUI.Textarea
                }
            ],
            mapFunc: (item: IntSermon): IntListItem => {
                return {
                    id: item.id,
                    title: item.title,
                    subtitle: item.subtitle,
                    thumbnail: 'https://img.youtube.com/vi/' + item.id + '/0.jpg',
                    redirect: 'sermon-page',
                    params: {
                      id: item.id
                    }
                }
            },
            postAddCallback: this.createAddChatIdFunc('Sermon', this.sermonsDB),
            postDeleteCallback: this.createRemoveChatIdFunc
        };

        this.allContactsDB = this.ibcFB.afDB.database.ref('contacts');
        this.allContacts$ = this.ibcFB.afDB.list<IntContact>('contacts').valueChanges().catch(err => Observable.of(null)).map(contacts => {
            if (!contacts) return [];
            return contacts.sort((a, b) => {
                let classA = a.class || 'user';
                let classB = b.class || 'user';
                return classA < classB ? -1 : classA > classB ? 1 : (a.name < b.name ? -1 : 1);
            });
        });

        this.contactsParams = {
            title: '聯繫人',
            forSelection: true,
            items$: this.allContacts$.map(contacts => contacts.filter(c => c.class != 'group' && !c.hidden)),
            itemsDB: this.allContactsDB,
            defaultAvatarImg: 'assets/img/default-photo.jpg',
            titleAs: item => `${item.chinese_name} (${item.name})`,
            filterFunc: (val, item) => {
                return `${item.chinese_name} ${item.name}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
            },
            mapFunc: (item: IntContact) => {
                return {
                    id: item.id,
                    subtitle: item.name,
                    chinese_name: item.chinese_name,
                    name: item.name,
                    key: item.username,
                    avatar: item.photoURL
                }
            }
        };

        this.activitiesDB = this.ibcFB.afDB.database.ref('activities');
        this.activities$ = this.ibcFB.afDB.list<IntListItem>('activities').valueChanges().map(items => {
            items.forEach(item => {
                item.isNew = moment().isBefore(item.datetime);
            })
            return items;
        });
        this.activitiesParams = {
            title: '教會活動',
            items$: this.activities$,
            itemsDB: this.activitiesDB,
            checkNew: true,
            // groupBy: 'past',
            // groupOrderByFunc: (a,b) => (a?1:0) < (b?1:0) ? -1 : 1,
            orderByFunc: (a, b) => a.datetime > b.datetime ? -1 : 1,
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
                // {
                //     key: 'past',
                //     groupByFunc: (val) => {
                //         return val ? '過去的活動' : '新活動';
                //     },
                //     caption: '這是舊的活動',
                //     type: TypeInputUI.Boolean,
                //     default: false,
                // },
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
                    subtitle: moment(item.datetime).format('YYYY年M月D日'),
                    datetime: item.datetime,
                    thumbnail: item.thumbnail,
                    redirect: 'activity-page',
                    isNew: item.isNew,
                    params: {id: item.id}
                }
            },
            postAddCallback: this.createAddChatIdFunc('Activity', this.activitiesDB),
            postDeleteCallback: this.createRemoveChatIdFunc
        };

        /* User Management */
        this.userManagementParams = {
            title: '用户页面',
            noSlideOptions: true,
            items$: this.allContacts$.map(contacts => contacts.filter(c => c.class != 'group' && !c.hidden)),
            itemsDB: this.allContactsDB,
            defaultAvatarImg: 'assets/img/default-photo.jpg',
            titleAs: item => `${item.chinese_name} (${item.name})`,
            filterFunc: (val, item) => {
                return `${item.chinese_name} ${item.name}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
            },
            mapFunc: (item: IntContact) => {
                return {
                    id: item.id,
                    subtitle: item.name,
                    chinese_name: item.chinese_name,
                    name: item.name,
                    key: item.username,
                    avatar: item.photoURL
                }
            }
        };

        /* User group management */
        this.groupManagementDB = this.ibcFB.afDB.database.ref('userGroups');
        this.groupManagement$ = this.ibcFB.afDB.list<IntUserGroup>('userGroups').valueChanges();
        this.groupManagementParams = {
            title: '群组管理',
            items$: this.groupManagement$,
            itemsDB: this.groupManagementDB,
            defaultAvatarImg: 'assets/img/user-group.png',
            templateForAdd: [
                {
                    key: 'groupName',
                    caption: '群组关键字（英）'
                },
                {
                    key: 'title',
                    caption: '群组名（中）'
                },
                {
                    key: 'subtitle',
                    caption: '描述'
                },
                {
                    key: 'avatar',
                    caption: '头像URL'
                }
            ],
            itemTappedPreFunc: (group: IntUserGroup, groupIndex: number) => {
                this.tempListPageParams = Object.assign({}, this.userManagementParams);

                this.tempListPageParams.title = group.title;

                let members$: Subject<string[]> = new BehaviorSubject<string[]>(group.members || []);

                this.tempListPageParams.items$ = Observable.combineLatest(
                    this.allContacts$.map(contacts => contacts.filter(c => c.class != 'group' && !c.hidden)),
                    members$
                ).map(res => {
                    return res[0].filter(c => res[1].filter(m => m == c.username).length > 0);
                });

                this.tempListPageParams.addItemUseComponent = 'list-page';
                this.tempListPageParams.addItemFuncFactory = (modalCtrl: ModalController, component: any) => {
                    return () => {
                        let modal = modalCtrl.create(component, {
                            type: Object.assign({}, this.contactsParams, {
                                preselectedItemKeys: group.members,
                            })
                        });

                        modal.onDidDismiss((contacts: IntContact[]) => {
                            if (contacts) {
                                let newMembers = contacts.map(c => c.username);
                                this.groupManagementDB.child(`${groupIndex}/members`).set(newMembers).then(() => {
                                    members$.next(newMembers);
                                    group.members = newMembers;
                                    this.commonSvc.toastSuccess('成功更新成员！');
                                }).catch(err => {
                                    this.commonSvc.toastFailure('无法更新成员', err);
                                });
                            }
                        });

                        modal.present();
                    }
                };
            },

            mapFunc: (group: IntUserGroup, groupIndex: number) => {
                return {
                    id: group.id,
                    name: group.groupName,
                    title: group.title,
                    subtitle: group.groupDescription,
                    avatar: group.avatar,
                    redirect: 'list-page',
                    members: group.members,
                    params: {
                        type: () => this.tempListPageParams
                    }
                }
            }
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

        this.versionDB = this.ibcFB.afDB.database.ref('version');
    }

}

import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider, IntContact, IntMessage, IntThread, IntListItem } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { NotificationProvider } from '../../providers/notification/notification';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AudioProvider } from '../../providers/audio/audio';
import { IbcEditorComponent } from '../../components/editor/editor';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import * as moment from 'moment';
import { ENV } from '@app/env';
import { Subscription } from 'rxjs';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'chat-page',
    segment: 'chat/:partnerId'
})
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    styles: [`
        .timestamp {
            max-width: 150px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            background-color: #CCC !important;
            border-radius: 10px !important;
            color: #FFF !important;
        }
    `]
})
export class ChatPage implements OnInit, OnDestroy {

    @ViewChild('chatArea') chatArea: ElementRef;

    partnerId: string;
    partner: IntContact;

    threadId: string;

    thread: IntThread = null;

    messageCount: number = 0;

    contacts: {[index: string]: IntContact};

    incomingMessage$: Subject<IntMessage> = new BehaviorSubject<IntMessage>(null);

    height: string = '100%';

    partnerUnreadCount: number = 0;

    subscription: Subscription;

    time_lastHour:  moment.Moment;
    time_today:     moment.Moment;
    time_yesterday: moment.Moment;
    time_lastWeek:  moment.Moment;
    time_lastMonth: moment.Moment;
    time_lastYear:  moment.Moment;

    private headers: Headers;

    constructor( 
        public http: IbcHttpProvider, 
        public navCtrl: NavController, 
        public navParams: NavParams,
        public cacheSvc: FileCacheProvider,
        public commonSvc: CommonProvider,
        public audioSvc: AudioProvider,
        public notificationSvc: NotificationProvider,
        public modalCtrl: ModalController,
        public loadTrackerSvc: LoadTrackerProvider,
        public content: DataProvider) {

        window['moment'] = moment;

        this.time_lastHour = moment().startOf('hour');
        this.time_today = moment().startOf('day');
        this.time_yesterday = moment().subtract(1, 'day').startOf('day');
        this.time_lastWeek = moment().subtract(1, 'week').startOf('isoWeek');
        this.time_lastMonth = moment().subtract(1, 'month').startOf('month');
        this.time_lastYear = moment().subtract(1, 'year').startOf('year');

        this.partnerId = this.navParams.get('partnerId');
        let preloaded_thread = this.navParams.get('thread');

        this.content.allContactsDB.once('value', snapshot => {
            this.contacts = snapshot.val();

            if (this.partnerId) {
                this.partner = this.contacts[this.partnerId];
            } else {
                this.partner = this.navParams.get('contact');
            }

            if (this.partner) {
                this.subscription = this.content.currentUser$.flatMap(auth => {

                    let body = { receiver_id: this.partner.id };

                    this.activate();

                    // console.log('Your chatting partner is:');
                    // console.log(this.partner.chinese_name);
                    // console.log(this.content.myselfContact.photoURL);
                    // console.log(this.cacheSvc.cachingMap[this.content.myselfContact.photoURL].target);                    

                    /* Clear all Unread Notifications */
                    this.content.allStatusDB
                        .child(this.content.myselfContact.id)
                        .child(this.partner.id)
                        .child('chat_notifs').set(0);

                    this.loadTrackerSvc.loading = true;
                    if (preloaded_thread) {
                        return Observable.of(preloaded_thread);
                    } else {
                        return Observable.from(this.http.post(`firebase/thread_with`, body)).timeout(5000)
                    }
                }).flatMap(data => {
                    this.threadId = data.result;
                    let thread = data.thread;

                    preloaded_thread = null;

                    if (!thread.messages) {
                        thread.messages = [];
                    }

                    if (thread.messages.length > 0) {
                        thread.messages.pop();
                    }

                    this.thread = thread;

                    return this.content.ibcFB.afDB.object<IntThread>(`threads/${this.threadId}`).valueChanges()
                }).catch(error => {
                    console.error(error);
                    return Observable.of(null);
                })
                    .subscribe(res => {
                        // console.log(res);
                        // this.thread = res;
                        this.loadTrackerSvc.loading = false;

                        let fireDBThread = res;

                        if (fireDBThread && fireDBThread.messages && fireDBThread.messages.length > 0) {
                            if (this.thread.messages.length == 0 || 
                                this.thread.messages[this.thread.messages.length-1].timestamp != fireDBThread.messages[0].timestamp)
                            this.thread.messages.push(fireDBThread.messages[0]);
                        }

                        let messageCount = this.thread && this.thread.messages && this.thread.messages.length || 0;

                        if (messageCount > this.messageCount
                            && this.thread.messages[messageCount - 1].sender != this.content.myselfContact.id) {
                            this.incomingMessage$.next(this.thread.messages[messageCount - 1]);
                        }

                        this.messageCount = messageCount;

                        this.scrollDown();
                    }, error => {
                        this.loadTrackerSvc.loading = false;
                    })
            }

        })

        this.incomingMessage$.skip(1).subscribe(m => {
            this.audioSvc.play('incomingMessage');
        })
    }

    ngOnInit(): void {

        /* Make sure set chat_active to false when the app is no longer in use */
        this.commonSvc.platform.pause.subscribe(e => {
            console.log('=== quit chatting! ===');
            this.deactivate();
        });

        window.addEventListener('beforeunload', () => {
            this.deactivate();
        });
    }

    ngOnDestroy(): void {
        this.deactivate();
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    updateActive(val: boolean = true): void {
        this.content.allStatusDB
                    .child(this.content.myselfContact.id)
                    .child(this.partner.id)
                    .child('chat_active').set(val);
    }

    activate(): void {
        this.updateActive(true);
    }

    deactivate(): void {
        this.updateActive(false);
    }

    timeDivider(time: string): string {
        let dt = moment(time);
        if (dt >= this.time_lastHour) {
            return dt.format('HH:');
        } else if (dt >= this.time_today) {
            return "今天";
        } else if (dt >= this.time_yesterday) {
            return "昨天";
        } else if (dt >= this.time_lastWeek) {
            return dt.format('MM/DD');
        } else if (dt >= this.time_lastMonth){
            return dt.format('MM/DD non');
        } else if (dt >= this.time_lastYear){
            return dt.format('MM');
        } else {
            return dt.format('YYYY');
        }
    }

    timeDividerMessage(divider: string, timestamp: string): string {
        let dt = moment(timestamp);
        if (divider.match(/^\d\d:$/)) {
            return dt.format('H:mm a');
        } else if (divider == '今天' || divider == '昨天') {
            return divider + ' ' + dt.format('H:mm a');
        } else if (divider.match(/^\d\d\/\d\d$/)) {
            return dt.format('dddd M月D日 h:mm a');
        } else if (divider.match(/^\d\d\/\d\d non$/)) {
            return dt.format('M月D日');
        } else if (divider.match(/^\d\d$/)) {
            return dt.format('M月');
        } else {
            return dt.format('YYYY年')
        }
    }

    addPartnerNotif(): void {
       if (this.partner.class == 'group') return;

       this.content.allStatusDB
                   .child(this.partner.id)
                   .child(this.content.myselfContact.id)
                   .child('chat_active')
                   .once('value', snapshot => {

           let val = snapshot.val();

           /* Do not add notif if chatting is active */
           if (val) return;

           this.content.allStatusDB
               .child(this.partner.id)
               .child(this.content.myselfContact.id)
               .child('chat_notifs').once('value', snapshot => {
                   let notif = snapshot.val();

                   if (notif == null) {
                     this.content.allStatusDB
                           .child(this.partner.id)
                           .child(this.content.myselfContact.id)
                           .child('chat_notifs').set(1);

                     this.partnerUnreadCount = 1;
                   } else {
                     this.content.allStatusDB
                           .child(this.partner.id)
                           .child(this.content.myselfContact.id)
                           .child('chat_notifs').set(notif+1);

                     this.partnerUnreadCount = notif + 1;
                   }

                   this.sendAddNotification();    
               });
       });
    }

    clearPartnerNotif(): void {

    }

    scrollDown() {
        setTimeout(() => {
            if (this.chatArea) {
                this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
            }
        }, 500);
    }

    ionViewDidLoad() {
    }

    formatMessageBody(text: string) {
        if (!text) return;
        return text;
    }

    sendMessage(): void {

        let callback = data => {
            let message = data && data.message;

            if (!message) return;

            console.log(`Message: ${message}`);

            return this.http.post('firebase/thread_add_msg', {
               thread_id: this.threadId,
               message: {
                   body: message
               }
            })
            .then(() => {
                console.log('--- message added ---');
                setTimeout(() => this.audioSvc.play('messageSent'), 1000);
                /* Add notif to the partner's status container */
                this.addPartnerNotif();
                return null;
            }, console.error)
        };

        this.navCtrl.push(IbcEditorComponent, {
            titleContent: `To ${this.partner.name}`,
            useNavController: true,
            callBack: callback
        });
        // let modal = this.modalCtrl.create(EditorPage, {
        //     titleContent: `To ${this.partner.name}`
        // });
        // modal.present();
        // modal.onDidDismiss(data => {
        //     let message = data && data.message;

        //     if (!message) return;

        //     this.http.post(`${ENV.apiServer}/firebase/thread_add_msg`, {
        //        thread_id: this.threadId,
        //        message: {
        //            body: message
        //        }
        //     }, new RequestOptions({ headers: this.headers }))
        //         .timeout(5000)
        //         .subscribe(() => {
        //             this.audioSvc.play('messageSent');

        //             /* Add notif to the partner's status container */
        //             this.addPartnerNotif();                
        //         }, console.error);            
        // });
    }

    sendAddNotification(): void {
        if (!this.partner) return;

        let datetimeCaption = moment().format("M月D日 HH:mm");
        let item: IntListItem = {
            datetime: datetimeCaption,
            isNew: true,
            key: `${this.partner.id}-message`,
            value: `${this.partner.id}-${this.partnerUnreadCount}`,
            params: {
                contact: this.content.myselfContact
            },
            redirect: "chat-page",
            sender: this.content.myselfContact.id,
            subtitle: "點擊查看",
            title: `${this.content.myselfContact.name}給你發了消息`
        }

        this.notificationSvc.addNotification(this.partner.id, item);
    } 

}

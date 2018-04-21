import { Component, Inject, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider, IntContact, IntMessage, IntThread } from '../../providers/data-adaptor/data-adaptor';
import { EnvVariables } from '../../app/environment/environment.token';
import { CommonProvider } from '../../providers/common/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AudioProvider } from '../../providers/audio/audio';
import * as moment from 'moment';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage implements AfterViewInit {

    @ViewChild('chatArea') chatArea: ElementRef;
    @ViewChild('myInput') myInput: ElementRef;

    partner: IntContact;

    threadId: string;

    thread: IntThread = null;

    messageCount: number = 0;

    contacts: {[index: string]: IntContact};

    incomingMessage$: Subject<IntMessage> = new BehaviorSubject<IntMessage>(null);

    constructor(@Inject(EnvVariables) public envVariables, 
        public http: Http, 
        public navCtrl: NavController, 
        public navParams: NavParams,
        public cacheSvc: FileCacheProvider,
        public commonSvc: CommonProvider,
        public audioSvc: AudioProvider,
        public content: DataProvider) {

        this.partner = this.navParams.get('contact');

        if (this.partner) {
            this.content.ibcFB.userProfile$.filter(auth => auth != null).flatMap(auth => {
                let headers = new Headers({ Authorization: `Bearer ${auth.uid}`, Accept: 'application/json', 'Content-Type': 'application/json' });

                let body = { receiver_id: this.partner.id };

                return http.post(`${this.envVariables.apiServer}/firebase/thread_with`, body, new RequestOptions({ headers }))
                .timeout(5000)
            }).flatMap(res => {
                let data = res.json();
                this.threadId = data.result;
                return this.content.ibcFB.afDB.object<IntThread>(`threads/${this.threadId}`).valueChanges()
            }).catch(error => {
                console.error(error);
                return Observable.of(null);
            })
            .subscribe(res => {
                // console.log(res);
                this.thread = res;
                let messageCount = this.thread && this.thread.messages && this.thread.messages.length || 0;

                if (messageCount > this.messageCount 
                    && this.thread.messages[messageCount-1].sender != this.content.myselfContact.id) {
                    this.incomingMessage$.next(this.thread.messages[messageCount-1]);
                }

                this.messageCount = messageCount;

                this.scrollDown();
            })
        }

        this.content.allContactsDB.on('value', snapshot => {
            this.contacts = snapshot.val();
        })

        this.incomingMessage$.skip(1).subscribe(m => {
            this.audioSvc.play('incomingMessage');
        })
    }

    resize(reset?: boolean) {
        let element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
        if (reset) {
            element.style.height = 'auto';
            this.myInput['_elementRef'].nativeElement.style.height = 'auto';
        } else {
            let scrollHeight = element.scrollHeight;
            element.style.height = scrollHeight + 'px';
            this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 25) + 'px';
        }
        this.scrollDown();
    }

    scrollDown() {
        setTimeout(() => {
            this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
        }, 500);
    }

    ionViewDidLoad() {
    }

    ngAfterViewInit(): void {
        this.resize();
    }

    formatMessageBody(text: string) {
        if (!text) return;
        return text;
    }

    send(inputElem: HTMLInputElement) {
        let message = inputElem.value;

        if (!message) return;

        this.content.threadDB.child(`${this.threadId}/messages/${this.messageCount}`).set({
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            body: message,
            sender: this.content.myselfContact.id
        }).then(() => {
            inputElem.value = '';
            this.resize(true);
            this.audioSvc.play('messageSent');
        }, console.error);
    }

}

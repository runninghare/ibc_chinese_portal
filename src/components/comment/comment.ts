import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ChatPage } from '../../pages/chat/chat';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider, IntMessage } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import { Observable, Subscription } from 'rxjs';

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'ibc-comment',
    templateUrl: 'comment.html'
})
export class CommentComponent implements OnInit, OnDestroy {

    @Input('chatId') chatId: string;
    @Input('title') title: string;

    text: string;

    messages: IntMessage[] = [];

    threadRes: any;

    subscription: Subscription;

    constructor(public navCtrl: NavController, public commonSvc: CommonProvider, public content: DataProvider, public http: IbcHttpProvider) {
        console.log('Hello CommentComponent Component');
        this.text = 'Hello World';
    }

    goToChat(): void {
        this.navCtrl.push(ChatPage, { contact: { id: this.chatId, name: '留言', chinese_name: this.title }, thread: this.threadRes });
    }

    ngOnInit(): void {
        this.subscription = this.content.currentUser$.subscribe(auth => {

            if (this.chatId) {
                let body = { receiver_id: this.chatId };

                this.http.post(`firebase/thread_with`, body).then(res => {
                    this.threadRes = res;
                    if (res && res.thread && res.thread.messages) {
                        this.messages = res.thread.messages;
                    }
                })
            }

        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

}

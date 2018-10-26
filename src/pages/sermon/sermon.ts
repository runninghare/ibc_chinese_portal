import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider, IntSermon } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { ChatPage } from '../../pages/chat/chat';

/**
 * Generated class for the SermonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'sermon-page',
    segment: 'sermon/:id'
})
@Component({
    selector: 'page-sermon',
    templateUrl: 'sermon.html',
})
export class SermonPage {

    sermon: IntSermon;

    constructor(public navCtrl: NavController, public navParams: NavParams, public commonSvc: CommonProvider, public content: DataProvider) {
        // xFFHEJE3914
        let id = this.navParams.get('id');
        if (id) {
            this.content.sermons$.subscribe(sermons => {
                this.sermon = sermons.filter(s => s.id == id)[0];
                console.log(this.sermon);
            })
        }
    }

    goToChat(): void {
        if (this.sermon) {
            this.navCtrl.push(ChatPage, { contact: { id: this.sermon.chatId, name: '留言', chinese_name: this.sermon.title } });
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SermonPage');
    }

}

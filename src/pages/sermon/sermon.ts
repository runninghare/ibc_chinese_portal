import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider, IntSermon } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { ChatPage } from '../../pages/chat/chat';
import { WechatProvider } from '../../providers/wechat/wechat';

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
    host: {
        class: 'ibc-allow-text-select'
    }
})
export class SermonPage {

    sermon: IntSermon;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
        public commonSvc: CommonProvider, public content: DataProvider, public wechat: WechatProvider) {
        // xFFHEJE3914
        let id = this.navParams.get('id');
        if (id) {
            this.content.sermons$.subscribe(sermons => {
                this.sermon = sermons.filter(s => s.id == id)[0];
                console.log(this.sermon);
            })
        }
    }

    share(): void {
      let url = `http://ibc.medocs.com.au/app/#/sermon/${this.sermon.id}`;
      this.wechat.weChatShareLink(url, `教會講道分享: ${this.sermon.title}`, this.sermon.subtitle, 
          this.sermon.thumbnail || `https://img.youtube.com/vi/${this.sermon.id}/0.jpg`);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SermonPage');
    }

}

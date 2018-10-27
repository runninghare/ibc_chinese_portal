import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';
import { WechatProvider } from '../../providers/wechat/wechat';

/**
 * Generated class for the IframePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'iframe-page',
    segment: 'iframe/:title/:url'
})
@Component({
  selector: 'page-iframe',
  templateUrl: 'iframe.html',
  host: {
      class: 'ibc-allow-text-select'
  }
})
export class IframePage {

  title: string;
  iframeSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonSvc: CommonProvider, public content: DataProvider, public wechat: WechatProvider) {
      this.title = navParams.get('title');
      try {
          this.iframeSrc = this.commonSvc.sanitize(atob(navParams.get('url')));
      } catch(e) {
          this.iframeSrc = this.commonSvc.sanitize('');
      }
      // this.iframeSrc = this.commonSvc.sanitize('http://ibc.medocs.com.au/adm/news_cmIBC.htm');
  }

  share(): void {
      let url = `http://ibc.medocs.com.au/app/#/iframe/教会分享/${this.navParams.get('url')}`;
      this.wechat.weChatShareLink(url, '教会分享', this.title, 'http://ibc.medocs.com.au/app/assets/icon/chrome-icon.png');
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad IframePage');
  }

}

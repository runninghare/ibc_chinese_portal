import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the IframePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: 'iframe/:title/:url'
})
@Component({
  selector: 'page-iframe',
  templateUrl: 'iframe.html',
})
export class IframePage {

  title: string;
  iframeSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonSvc: CommonProvider) {
      this.title = navParams.get('title');
      try {
          this.iframeSrc = this.commonSvc.sanitize(atob(navParams.get('url')));
      } catch(e) {
          this.iframeSrc = this.commonSvc.sanitize('');
      }
      // this.iframeSrc = this.commonSvc.sanitize('http://ibc.medocs.com.au/adm/news_cmIBC.htm');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IframePage');
  }

}

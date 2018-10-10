import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import * as $ from 'jquery';

/**
 * Generated class for the AppLinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: 'app-link/:path/:param1/:param2'
})
@Component({
  selector: 'page-app-link',
  templateUrl: 'app-link.html',
})
export class AppLinkPage {

  // @ViewChild('loader') loader: ElementRef;

  // sanitizedUrl: string;
  path: string;
  param1: string;
  param2: string;
  hash: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonSvc: CommonProvider) {
      this.path = navParams.get('path');
      this.param1 = navParams.get('param1');
      this.param2 = navParams.get('param2');
  }

  ionViewDidLoad() {
    // this.sanitizedUrl = this.commonSvc.sanitize(location.origin);
    // this.sanitizedUrl = this.commonSvc.sanitize('http://ibc.medocs.com.au/adm/news_cmIBC.htm');

    if (this.path) {
        let hash = `${this.path}`

        if (this.param1 != 'null') {
            hash += `/${this.param1}`;
        }

        if (this.param2 != 'null') {
            hash += `/${this.param2}`;
        }

        this.hash = hash; 

        location.href = `ibcchinese://redirect/${hash}`;

        setTimeout(() => {
            if (this.commonSvc.isIos) {
                location.href = 'https://itunes.apple.com/us/app/id1338517393';
            } else if (this.commonSvc.isAndroid) {
                location.href = 'https://play.google.com/store/apps/details?id=com.rjwebsolution.ibcchinese';
            }
        }, 1000);
    }

    // $(this.iframe.nativeElement).attr('src', "http://www.google.com.au");
  }

}
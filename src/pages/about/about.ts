import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IbcStyleProvider } from '../../providers/ibc-style/ibc-style';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'about-page'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  bgColor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, ibcStyle: IbcStyleProvider) {
      this.bgColor =  'home-bg-0'; //ibcStyle.randomBg;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}

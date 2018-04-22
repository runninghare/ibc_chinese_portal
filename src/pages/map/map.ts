import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  title: string;
  address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.title = navParams.get('title');
      this.address = navParams.get('address');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}

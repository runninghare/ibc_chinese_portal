import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  title: string;
  address: string;
  height: number;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
      this.title = navParams.get('title');
      this.address = navParams.get('address');
      this.height = window.innerHeight - 120;
  }

  cancel(): void {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}

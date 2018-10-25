import { Component, OnInit } from '@angular/core';
import { App, ViewController, NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../../pages/user-profile/user-profile';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="editUserProfile();close()">編輯 Edit</button>
      <button ion-item (click)="navParams.data.logout(); close()">登出 Sign Out</button>
    </ion-list>
  `
})
export class HeaderPopOverComponent implements OnInit {
  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, public navCtrl: NavController) {}

  ngOnInit(): void {
    console.log(this.navParams);
  }

  editUserProfile(): void {
    // this.navCtrl.push(UserProfilePage);
    this.app.getRootNav().push(UserProfilePage);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
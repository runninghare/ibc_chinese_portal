import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminSmsPage } from '../../pages/admin-sms/admin-sms';
import { ListPage } from '../../pages/list/list';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { CommonProvider } from '../../providers/common/common';
import * as moment from 'moment';

/**
 * Generated class for the AdminSystemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'admin-system-page'
})
@Component({
  selector: 'page-admin-system',
  templateUrl: 'admin-system.html',
})
export class AdminSystemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public common: CommonProvider, public ibcFB: IbcFirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSystemPage');
  }

  goToSms() {
      this.navCtrl.push(AdminSmsPage);
  }

  updateBulletinAndPpt() {
    this.ibcFB.afDB.database.ref(`updateCaches`).once('value', snapshot => {
      let caches = snapshot.val();
      // let latest = moment().format('YYYY-MM-DD HH:mm:ss');
      let latest = moment().toString();
      Promise.all(caches.map((cache,index) => this.ibcFB.afDB.database.ref(`updateCaches/${index}/timestamp`).set(latest))).then(() => {
        this.common.toastSuccess('期刊PPT缓存更新成功！');
      }).catch(err => {
        this.common.toastFailure('期刊PPT缓存更新失败!',err);
      });
    })
  }

  goToHomeCardManagement() {
    this.navCtrl.push(ListPage, {type: 'homeCardsParams'})
  }

}

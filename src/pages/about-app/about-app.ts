import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { HomePage } from '../../pages/home/home';
import { ENV } from '@app/env';

/**
 * Generated class for the AboutAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
    name: 'about-app-page'
})
@Component({
  selector: 'page-about-app',
  templateUrl: 'about-app.html',
})
export class AboutAppPage {

    env = ENV;

    get rootCtrl(): NavController {
        return this.app.getRootNav();
    }

    constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,
        public common: CommonProvider, public content: DataProvider) {
        // console.log('--- about app constructed! ---');
        // console.log(JSON.stringify(navParams));
    }

    goBack(): void {
        this.common.ignoreUpdate();
        if (this.navCtrl.getViews().length > 1) {
            this.navCtrl.pop();
        } else {
            this.rootCtrl.setRoot(HomePage);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutAppPage');
    }

}

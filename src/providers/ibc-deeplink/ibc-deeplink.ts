import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks';
import { App, NavController, Platform, PopoverController, AlertController } from 'ionic-angular';

import { WechatProvider } from '../../providers/wechat/wechat';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { CommonProvider } from '../../providers/common/common';

import { MinistryPage } from '../../pages/ministry/ministry';
import { ListPage } from '../../pages/list/list';
import { AboutPage } from '../../pages/about/about';
import { ActivityPage } from '../../pages/activity/activity';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { AboutAppPage } from '../../pages/about-app/about-app';

/*
  Generated class for the IbcDeeplinkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IbcDeeplinkProvider {

    constructor(public http: HttpClient, public loadTrackerSvc: LoadTrackerProvider, public deepLinks: Deeplinks,
        public wechat: WechatProvider, public ibcFB: IbcFirebaseProvider, public app: App, public platform: Platform,
        public common: CommonProvider) {
        console.log('Hello IbcDeeplinkProvider Provider');
    }

    listening: boolean;

    listen(navCtrl: NavController): void {
        if (this.listening) return;

        if (!this.common.isWeb) {
            this.platform.ready().then(() => {
                this.loadTrackerSvc.loading = true;
                this.deepLinks.routeWithNavController(navCtrl, {
                    // '/about-page': AboutPage,
                    // '/about-app-page': AboutAppPage,
                    // '/list-page/:type': ListPage,
                    // '/activity-page/:itemIndex/:itemId': ActivityPage
                })
                    .subscribe(match => {
                        // match.$route - the route we matched, which is the matched entry from the arguments to route()
                        // match.$args - the args passed in the link
                        // match.$link - the full link data
                        console.log('Successfully matched route', JSON.stringify(match));
                        this.loadTrackerSvc.loading = false;

                        if (match && match.$link) {
                            let data = match.$link;
                            let queryString = data.queryString;
                            console.log(JSON.stringify(data));

                            let wechatMatch = queryString.match(/code=(\w+)&state=\w+&lang=\w+&country=\w+/);
                            if (this.wechat.linkingInProgress && wechatMatch) {
                                let code = wechatMatch[1];
                                this.ibcFB.linkWeChatSendApiRequest(code);
                            } else if (this.wechat.LoggingInProgress && wechatMatch) {
                                console.log('--- send request to login in! ---');
                                let code = wechatMatch[1];
                                this.ibcFB.loginWeChatSendApiRequest(code);
                            } else {
                                //////////////////////////////////////////////////
                                /* Generic Path Redirection Handling
                                   path is the page name; queryParams is an object of params to inject.
                                   e.g.
                                   navCtrl.push('activity-page', {itemIndex: 0, itemId: 2})
                                 */
                                //////////////////////////////////////////////////
                                // location.href = `#${data.path}`;
                                // navCtrl.push(data.path.replace(/^\/+/,''));
                                let queryParams = this.common.parseURLParameters(data.queryString);
                                navCtrl.push(data.path.replace(/^\/+/,''), queryParams);
                            }
                        }
                    }, nomatch => {
                        // nomatch.$link - the full link data
                        console.error('Got a deeplink that didn\'t match', nomatch);
                        this.loadTrackerSvc.loading = false;
                    });

                this.listening = true;    

                setTimeout(() => {
                    this.loadTrackerSvc.loading = false;
                }, 2000);
            })
        }
    }

}

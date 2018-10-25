import { Component, OnInit, AfterViewInit, animate, state, trigger, style, transition } from '@angular/core';
import { IonicPage, App, NavController, Platform, PopoverController, AlertController } from 'ionic-angular';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { CommonProvider } from '../../providers/common/common';
import { BrowserProvider } from '../../providers/browser/browser';
import { IbcStyleProvider } from '../../providers/ibc-style/ibc-style';
import * as firebase from 'firebase/app';
import * as rxjs from 'rxjs';
import { ToastController } from 'ionic-angular';
import { HeaderPopOverComponent } from '../../components/header-pop-over/header';
import { MinistryPage } from '../../pages/ministry/ministry';
import { ListPage } from '../../pages/list/list';
import { AboutPage } from '../../pages/about/about';
import { ActivityPage } from '../../pages/activity/activity';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { AboutAppPage } from '../../pages/about-app/about-app';
import { PhotoProvider } from '../../providers/photo/photo';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { DataProvider, IntHomeCard } from '../../providers/data-adaptor/data-adaptor';
import { WechatProvider } from '../../providers/wechat/wechat';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AudioProvider } from '../../providers/audio/audio';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { IbcDeeplinkProvider } from '../../providers/ibc-deeplink/ibc-deeplink';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Observable } from 'rxjs';

// declare var cordova;

@IonicPage({
    name: 'home-page',
})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        trigger(
            'showAnimation', [
                state('invisible', style({
                    opacity: 0,
                    visibility: 'hidden',
                    height: '0px'
                })),
                state('visible', style({
                    opacity: 1,
                    visibility: 'visible',
                    height: 'calc(100% - 100px)'
                })),
                transition('invisible => visible', animate('300ms ease-in')),
                transition('visible => invisible', animate('300ms ease-out'))
            ]
        )      
    ]
})
export class HomePage implements OnInit, AfterViewInit {

    showCustomLoginConfirm: boolean = false;

    get cards(): IntHomeCard[] {
        return this.content.homeCards.sort((a,b) => {
            if (!a.sortOrder) a.sortOrder = 0;
            if (!b.sortOrder) b.sortOrder = 0;
            return a.sortOrder < b.sortOrder ? -1 : a.sortOrder > b.sortOrder ? 1: 0
        });
    }

    authUser: firebase.User;

    bgClass: string;

    constructor(
        public navCtrl: NavController,
        public ibcFB: IbcFirebaseProvider,
        public platform: Platform,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public popOverCtrl: PopoverController,
        public ibcStyle: IbcStyleProvider,
        public photoSvc: PhotoProvider,
        public app: App,
        public browserSvc: BrowserProvider,
        public statusBar: StatusBar,
        public common: CommonProvider,
        public content: DataProvider,
        public fileOpener: FileOpener,
        public file: File,
        public fileCacheSvc: FileCacheProvider,
        public audioSvc: AudioProvider,
        public socialSharing: SocialSharing,
        public wechat: WechatProvider,
        public deepLinks: Deeplinks,
        public ibcDeepLinkSvc: IbcDeeplinkProvider,
        public loadTrackerSvc: LoadTrackerProvider
    ) {

        window['rxjs'] = rxjs;

        ibcFB.userProfile$.filter(auth => auth != null).subscribe(userProfile => {
            this.authUser = userProfile;
            // ibcFB.userProfile = userProfile;

            /* Set standard background for authenticated users */
            if (this.authUser && this.ibcFB.access_level > 0) {
                this.bgClass = this.ibcStyle.stdBg;
            } else {
                this.bgClass = 'home-bg-0';
            }
        }, err => {
            this.authUser = undefined;
            this.bgClass = this.ibcStyle.randomBg;
        });

        if (!common.doNotRemindUpdating) {
            setTimeout(() => {
                if (common.versionTooOld) {
                    this.navCtrl.push(AboutAppPage);
                }
            }, 5000);
        }

        this.ibcDeepLinkSvc.listen(this.navCtrl);
    }

    aboutUs(): void {
        this.navCtrl.push(AboutPage);
    }

    get gmailLinkable(): boolean {
      return this.content.myselfContact && this.content.myselfContact.email && /@gmail.com$/.test(this.content.myselfContact.email);
    }

    googleLogin(): void {
        this.ibcFB.loginGoogle();
    }

    wechatLogin(): void {
        this.ibcFB.loginWechat();
        // this.wechat.weChatLogin().then((res) => {
        //     console.log(JSON.stringify(res, null, 2));
        // }, err => {});
    }

    logout(): void {
        this.ibcFB.logoutGoogle().then(() => {
            this.audioSvc.play('logoutOk');
        });
        this.authUser = null;
        this.ibcFB.access_level = null;
        this.bgClass = this.ibcStyle.randomBg;
    }

    openBulletin(): void {
      this.browserSvc.openPage(this.content.urls['c-bulletin']);
    }

    openPPT(): void {
        this.browserSvc.openPage(this.content.urls['c-latestpptx']);
        
        // 
        // this.file.resolveLocalFilesystemUrl('www/c-latestpptx.pdf').then(res => {
        //     console.log(JSON.stringify(res));
        // }, err => JSON.stringify(err));
        // console.log(this.file.applicationDirectory.replace('file://','') + '/www/c-latestpptx.pdf');

        // this.fileOpener.open(this.file.applicationDirectory.replace('file://','') + '/www/c-latestpptx.pdf', 'application/pdf')
        //     .then(() => console.log('File is opened'))
        //     .catch(e => console.log('Error openening file', JSON.stringify(e)));
      // this.browserSvc.openPage(cordova.file.applicationDirectory+'/www/c-latestpptx.pptx');
      // this.browserSvc.openPage('file:///private/var/mobile/Containers/Data/Application/4DA4A1B3-B6EC-46DA-B41F-55694F6DF454/tmp/tempFile.pdf');
      // this.browserSvc.openPage('cdvfile://localhost/cache/tempFile.pdf');
      // this.browserSvc.openPage('cdvfile://localhost/cache/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9pYmMtYXBwLTk0NDY2LmFwcHNwb3QuY29tL28vYXZhdGFyJTJGaWJjX1V3ZWVmYWU5R2FpdGg/YWx0PW1lZGlhJnRva2VuPTY4MzJhYjM3LWVmMjctNDdmMC1iMzgyLWUzOWI1ODc0ODE4Nw==/avatar/ibc_Uweefae9Gaith');
      // this.browserSvc.openPage('cdvfile://localhost/cache/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9pYmMtYXBwLTk0NDY2LmFwcHNwb3QuY29tL28vYXZhdGFyJTJGaWJjX1V3ZWVmYWU5R2FpdGg/YWx0PW1lZGlhJnRva2VuPTY4MzJhYjM3LWVmMjctNDdmMC1iMzgyLWUzOWI1ODc0ODE4Nw==');
    }    

    presentPopover(myEvent) {
        if (!this.authUser.uid || !this.ibcFB.access_level) {
            return;
        }

        let popover = this.popOverCtrl.create(HeaderPopOverComponent, {
            logout: this.logout.bind(this)
        });

        // let rect;
        // let rectDom = myEvent.target.getBoundingClientRect();

        // if (typeof rectDom.toJSON == 'function') {
        //   rect = rectDom.toJSON();
        //   rect.top = 80;
        // } else {
        //   rect = rectDom;
        // }

        // myEvent.target.getBoundingClientRect = () => rect;

        popover.present({
            ev: myEvent
            // ev: {
            //   target: {
            //     getBoundingClientRect: () => rect
            //   }
            // }
        });
    }

    homecardRedirect(card: IntHomeCard): void {
        let params;
        try {
            params = eval(JSON.parse(card.params));
        } catch (e) {
        }
        if (card.hyperlink) {
            this.browserSvc.openPage(card.hyperlink);
        } else if (card.redirect == 'MinistryPage') {
            this.navCtrl.push(MinistryPage, Object.assign({},params));
        // } else if (card.redirect == 'SongPage') {
        //     this.navCtrl.push(ListPage, {type: 'nextSongPageParams'});
        //     // this.navCtrl.push(SongPage, { nextServiceOnly: true });
        // } else if (card.redirect == 'TaskPage') {
        //     this.navCtrl.push(ListPage, {type: 'myTasksParams'});
        //     // this.navCtrl.push(SongPage, { nextServiceOnly: true });
        } else if (card.redirect == 'ActivityPage') {
            this.navCtrl.push(ActivityPage, Object.assign({},params));
        } else if (card.redirect == 'ListPage') {
            this.navCtrl.push(ListPage, Object.assign({},params));
            // this.navCtrl.push(SongPage, { nextServiceOnly: true });
        }
    }

    badgeCountIsNumber(badgeCount: any): boolean {
        return badgeCount != null && !isNaN(badgeCount);
    }

    socialShare(): void {
        this.socialSharing['share']("Hello World!", null, null);
    }

    ngOnInit(): void {
        this.bgClass = this.ibcStyle.randomBg;

        let subscription = this.content.currentUser$.subscribe(contact => {
            if (!contact.visited) {
                this.navCtrl.push(UserProfilePage);
                subscription.unsubscribe();
            }
        });
    }

    ngAfterViewInit(): void {
    }

}

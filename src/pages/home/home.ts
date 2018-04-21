import { Component, OnInit, AfterViewInit, Inject, animate, state, trigger, style, transition, forwardRef } from '@angular/core';
import { App, NavController, Platform, PopoverController } from 'ionic-angular';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { CommonProvider } from '../../providers/common/common';
import { BrowserProvider } from '../../providers/browser/browser';
import { IbcStyleProvider } from '../../providers/ibc-style/ibc-style';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import * as rxjs from 'rxjs';
import { ToastController } from 'ionic-angular';
import { EnvVariables } from '../../app/environment/environment.token';
import { HeaderPopoverPage } from '../../pages/Popover/header';
import { MinistryPage } from '../../pages/ministry/ministry';
import { ListPage } from '../../pages/list/list';
// import { PhotoEditPage } from '../../pages/photo-edit/photo-edit';
import { PhotoProvider } from '../../providers/photo/photo';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { DataProvider, IntHomeCard, IntContact } from '../../providers/data-adaptor/data-adaptor';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

declare var cordova;

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
        return this.content.homeCards;
    }

    authUser: firebase.User;

    bgClass: string;

    constructor(
        public navCtrl: NavController,
        public ibcFB: IbcFirebaseProvider,
        public platform: Platform,
        public toastCtrl: ToastController,
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
        @Inject(EnvVariables) public envVariables
    ) {

        window['rxjs'] = rxjs;

        ibcFB.userProfile$.filter(auth => auth != null).subscribe(userProfile => {
            this.authUser = userProfile;
            /* Set standard background for authenticated users */
            this.bgClass = this.ibcStyle.stdBg;
        }, err => {
            this.authUser = undefined;
            this.bgClass = this.ibcStyle.randomBg;
        });
    }

    get gmailLinkable(): boolean {
      return this.ibcFB.myselfContact.email && /@gmail.com$/.test(this.ibcFB.myselfContact.email);
    }

    login(): void {
        this.ibcFB.loginGoogle();
    }

    logout(): void {
        this.ibcFB.logoutGoogle();
        this.authUser = null;
        this.bgClass = this.ibcStyle.randomBg;
    }

    openBulletin(): void {
      this.browserSvc.openPage('http://ibc.medocs.com.au/DL/c-bulletin.pdf');
    }

    openPPT(): void {
        this.browserSvc.openPage('http://ibc.medocs.com.au/DL/c-latestpptx.pptx');
        
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
        let popover = this.popOverCtrl.create(HeaderPopoverPage, {
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
        if (card.hyperlink) {
            this.browserSvc.openPage(card.hyperlink);
        } else if (card.redirect == 'MinistryPage') {
            this.navCtrl.push(MinistryPage);
        } else if (card.redirect == 'SongPage') {
            this.navCtrl.push(ListPage, this.content.nextSongPageParams);
            // this.navCtrl.push(SongPage, { nextServiceOnly: true });
        } else if (card.redirect == 'TaskPage') {
            this.navCtrl.push(ListPage, this.content.myTasksParams);
            // this.navCtrl.push(SongPage, { nextServiceOnly: true });
        } else if (card.redirect == 'ActivityPage') {
            this.navCtrl.push(ListPage, this.content.activitiesParams);
            // this.navCtrl.push(SongPage, { nextServiceOnly: true });
        }
    }

    badgeCountIsNumber(badgeCount: any): boolean {
        return badgeCount != null && !isNaN(badgeCount);
    }

    ngOnInit(): void {
        this.bgClass = this.ibcStyle.randomBg;
    }

    ngAfterViewInit(): void {
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { DomSanitizer } from '@angular/platform-browser'
import { ToastController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { ENV } from '@app/env';

export { ToastController, AlertController } from 'ionic-angular';

export interface IntArrayChanges {
  newItems: any[];
  deletedItems: any[];
  updatedItems: any[];
}

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

    constructor(public http: HttpClient, public toastCtrl: ToastController, public sanitizer: DomSanitizer,
        public platform: Platform, public ibcFB: IbcFirebaseProvider, public alertCtrl: AlertController) {

        ibcFB.afDB.database.ref('version').on('value', snapshot => {
          this.newVersion = snapshot.val();
        });

        this.ibcFB.afDB.database.ref('text').on('value', snapshot => {
            let text = snapshot.val();
            this.text = text;            
        });
    }

    newVersion: string;

    text: any = {};

    get versionTooOld(): boolean {
        if (ENV.version && this.newVersion) {
            let pattern = new RegExp(/^(\d+)\.(\d+)\.(\d+)$/);
            let oldPatternMatches = ENV.version.match(pattern);
            let newPatternMatches = this.newVersion.match(pattern);

            if (oldPatternMatches.length == 4 && newPatternMatches.length == 4) {
                let oldMajor = parseInt(oldPatternMatches[1]);
                let newMajor = parseInt(newPatternMatches[1]);

                let oldMinor = parseInt(oldPatternMatches[2]);
                let newMinor = parseInt(newPatternMatches[2]);

                let oldPatch = parseInt(oldPatternMatches[3]);
                let newPatch = parseInt(newPatternMatches[3]);

                if (oldMajor < newMajor) 
                    return true;
                else if (oldMajor > newMajor) {
                    return false;
                } else if (oldMinor < newMinor) {
                    return true;
                } else if (oldMinor > newMinor) {
                    return false
                } else if (oldPatch < newPatch ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    get appStoreLink(): string {
        if (this.isIos) {
            return "https://itunes.apple.com/us/app/id1338517393?ls=1&mt=8";
        } else {
            return "https://play.google.com/store/apps/details?id=com.rjwebsolution.ibcchinese";
        }
    }

    doNotRemindUpdating: boolean = false;

    goToStorePage(): void {
        window.open(this.appStoreLink, '_system', 'location=no');
    }

    ignoreUpdate(): void {
        this.doNotRemindUpdating = true;
    }

    get isWeb(): boolean {
        return this.platform.is('core') || this.platform.is('mobileweb');
    }

    get isMobile(): boolean {
        return !this.isWeb;
    }

    get isAndroid(): boolean {
        return this.platform.is('android');
    }

    get isIos(): boolean {
        return this.platform.is('ios');
    }

    get readonly(): boolean {
        return this.ibcFB.access_level == null || this.ibcFB.access_level < 2;
    }

    /// Note: It's possible that both isMember and isNotMember being false
    /// because access_level can be null or undefined.
    get isMember(): boolean {
        return this.isLoggedIn && this.ibcFB.access_level > 0;
    }

    get isNotMember(): boolean {
        return this.isLoggedIn && this.ibcFB.access_level === 0;
    }

    get isLoggedIn(): boolean {
        return !!this.ibcFB.userProfile
    }

    differDays(timestamp: string): number {
        return moment().diff(moment(timestamp))/86400000;
    }

    sanitize(url: string): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    confirmDialog(title: string, message: string, confirmCallback, cancelCallback?, config?: {
        positiveLabel?: string,
        negativeLabel?: string
    }): void {
            let alert = this.alertCtrl.create({
                title,
                message,
                buttons: [
                    {
                        text: config && config.negativeLabel || '否',
                        role: 'cancel',
                        handler: cancelCallback || (() => {})
                    },
                    {
                        text: config && config.positiveLabel || '是',
                        handler: confirmCallback || (() => {})
                    }
                ]
            });
            alert.present();
    }

    makeRandomString(len: number): string {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    toastSuccess(msg: string, duration: number = 3000): void {
        let toast = this.toastCtrl.create({
            message: msg,
            duration,
            position: 'top',
            cssClass: 'toast-success',
            showCloseButton: true
        });

        toast.present();
    }

    toastFailure(msg: string, err?: any, duration: number = 3000): void {
        let toast = this.toastCtrl.create({
            message: err ? (msg + ': ' + JSON.stringify(err)) : msg,
            duration,
            position: 'top',
            cssClass: 'toast-danger',
            showCloseButton: true
        });

        toast.present();
    }

    arrayUniq(value, index, self) { 
        return self.indexOf(value) === index;
    }

    getArrayDiffs(oldArray: any[], newArray: any[], key: string, val: string, showUpdateDetail?: boolean): IntArrayChanges {

        if (!oldArray) oldArray = [];
        if (!newArray) newArray = [];

        let result: IntArrayChanges = {
            deletedItems: [],
            updatedItems: [],
            newItems: []
        };

        let oldKeys = [];
        let newKeys = [];

        if (!key) {
            oldKeys = oldArray;
            newKeys = newArray;
        } else {
            oldKeys = oldArray.map(item => item[key]);
            newKeys = newArray.map(item => item[key]);
        }

        /* Get unique key values from both oldArray and newArray */
        let allKeys = [...oldKeys, ...newKeys].filter((val, index, self) => self.indexOf(val) === index);
        // console.log(allKeys);

        allKeys.forEach(k => {
            if (oldKeys.indexOf(k) > -1 && newKeys.indexOf(k) == -1) {
                result.deletedItems.push(oldArray[oldKeys.indexOf(k)]);
            } else if (oldKeys.indexOf(k) > -1 && newKeys.indexOf(k) > -1) {
                let oldItem = oldArray[oldKeys.indexOf(k)];
                let newItem = newArray[newKeys.indexOf(k)];

                if (showUpdateDetail) {
                    result.updatedItems.push({
                        key: k,
                        oldItem,
                        newItem
                    });
                } else if (val && oldItem[val] != newItem[val]) {
                    result.updatedItems.push(newArray[newKeys.indexOf(k)]);
                }

            } else if (oldKeys.indexOf(k) == -1 && newKeys.indexOf(k) > -1) {
                result.newItems.push(newArray[newKeys.indexOf(k)]);
            }
        })

        return result;
    }

    resolve(): Promise<any> {
        return this.ibcFB.afDB.database.ref('text').once('value').then(snapshot => {
            let text = snapshot.val();
            this.text = text;
        });
    }

    parseURLParameters(s: string): any {
        let result = {};
        s.split('&').forEach(seg => {
            let parts = seg.split('=');
            result[parts[0]] = parts[1];
        });
        return result;
    }

}

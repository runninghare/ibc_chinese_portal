import { Injectable } from '@angular/core';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { CommonProvider } from '../../providers/common/common';
import { ToastController } from 'ionic-angular';
import { DataProvider, IntContact, IntMinistrySheet } from '../../providers/data-adaptor/data-adaptor';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

export {IntMinistrySheet } from '../../providers/data-adaptor/data-adaptor';
/*
  Generated class for the MinistryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MinistryProvider {

    ministrySheets: IntMinistrySheet[] = [];

    originalMinistrySheets: IntMinistrySheet[] = [];

    // get allContacts(): IntContact[] {
    //     return this.content.allContacts;
    // }

    ministryRoles = [
        { key: 'preacher', caption: '傳道', optionGetter: 'preacherCandidates' },
        { key: 'interpreter', caption: '翻譯', optionGetter: 'interpreterCandidates' },
        { key: 'leader', caption: '主席', optionGetter: 'leaderCandidates' },
        { key: 'choir1', caption: '敬拜1', optionGetter: 'choirCandidates' },
        { key: 'choir2', caption: '敬拜2', optionGetter: 'choirCandidates' },
        { key: 'assistant1', caption: '司事1', optionGetter: 'assistantCandidates' },
        { key: 'assistant2', caption: '司事2', optionGetter: 'assistantCandidates' },
        { key: 'music', caption: '司琴', optionGetter: 'musicCandidates' },
        { key: 'technician', caption: '影音', optionGetter: 'techCandidates' }
    ];

    allContacts: IntContact[] = [];

    subscription: Subscription;

    get readonly(): boolean {
        return this.common.readonly;
    }

    getContact(id: string): IntContact {
        return this.allContacts.filter(contact => contact.id == id)[0];
    }

    undo(): void {
        this.ministrySheets = _.cloneDeep(this.originalMinistrySheets);
    }

    subscribe(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = Observable.combineLatest(
            this.content.ministries$,
            this.content.allContacts$
        )
        .subscribe(res => {
            this.originalMinistrySheets = <any>res[0];
            // console.log('=== original ministrySheet');
            // console.log(this.originalMinistrySheets);

            this.allContacts = <any>res[1];
            this.undo();
        }, console.error, () => {
            console.log('=== ministry Svc subscription ends!');
        });
    }

    constructor(public ibcFB: IbcFirebaseProvider, public toastCtrl: ToastController,
        public common: CommonProvider, public content: DataProvider) {

        this.content.ibcFB.userProfile$.subscribe(auth => {
            // console.log("========== user profile changed! ============");
            setTimeout(() => {
                this.subscribe();
            }, 1000)
        });

    }

    get leaderCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('主席') > -1);
    }

    get preacherCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('傳道') > -1);
    }

    get choirCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('敬拜') > -1);
    }

    get assistantCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('司事') > -1);
    }

    get musicCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('司琴') > -1);
    }

    get techCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('影音') > -1);
    }

    get interpreterCandidates(): IntContact[] {
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf('翻譯') > -1);
    }

    saveSheet(): Promise<any> {
        let ref = this.ibcFB.afDB.database.ref('ministries');
        console.log(this.ministrySheets);
        return ref.set(this.ministrySheets);
    }

    pushSheet(): void {
        if (this.ministrySheets.length > 7) {
            return;
        }
        let mFurthestDate =  moment(this.ministrySheets[this.ministrySheets.length-1].date);
        let newDate = mFurthestDate.add(7, 'days').toDate();
        let newSheet: IntMinistrySheet = {date: moment(newDate).format("YYYY-MM-DD")};
        this.ministrySheets.push(newSheet);
    }

    popSheet(): void {
        if (this.ministrySheets.length == 1) {
            return;
        }
        this.ministrySheets.pop();
    }

    spliceSheet(i: number): void {
        if (this.ministrySheets.length == 1) {
            return;
        }
        this.ministrySheets.splice(i,1);
    }   

}
import { Injectable } from '@angular/core';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { CommonProvider } from '../../providers/common/common';
import { ToastController } from 'ionic-angular';
import { DataProvider, IntContact, IntMinistrySheet } from '../../providers/data-adaptor/data-adaptor';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

export {IntMinistrySheet } from '../../providers/data-adaptor/data-adaptor';

// export const MinistryRoles = [
//     { "key": "leader", "caption": "主席", "optionGetter": "leaderCandidates" },
//     { "key": "preacher", "caption": "講員", "optionGetter": "preacherCandidates" },
//     { "key": "interpreter", "caption": "傳譯", "optionGetter": "interpreterCandidates" },
//     { "key": "choir1", "caption": "敬拜1", "optionGetter": "choirCandidates" },
//     { "key": "choir2", "caption": "敬拜2", "optionGetter": "choirCandidates" },
//     { "key": "music1", "caption": "司樂1", "optionGetter": "musicCandidates" },
//     { "key": "music2", "caption": "司樂2", "optionGetter": "musicCandidates" },
//     { "key": "assistant1", "caption": "司事1", "optionGetter": "assistantCandidates" },
//     { "key": "assistant2", "caption": "司事2", "optionGetter": "assistantCandidates" },
//     { "key": "techanician", "caption": "影音", "optionGetter": "techCandidates" },
//     { "key": "morningtea1", "caption": "茶點1", "optionGetter": "morningteaCandidates" },
//     { "key": "morningtea2", "caption": "茶點2", "optionGetter": "morningteaCandidates" },
//     { "key": "communion1", "caption": "襄禮1", "optionGetter": "communionCandidates" },
//     { "key": "communion2", "caption": "襄禮2", "optionGetter": "communionCandidates" },
// ];

// export const MinistrySkills = [
//         { "key": "leader", "caption": "主席" },
//         { "key": "preacher", "caption": "講員" },
//         { "key": "interpreter", "caption": "傳譯" },
//         { "key": "choir", "caption": "敬拜" },
//         { "key": "music", "caption": "司樂" },
//         { "key": "assistant", "caption": "司事" },
//         { "key": "techanician", "caption": "影音" },
//         { "key": "morningtea", "caption": "茶點" },
//         { "key": "communion", "caption": "襄禮" }
// ];
  
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

    ministryRoles;

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

    publishUrl: string;

    ministrySkills: any[] = [];

    constructor(public ibcFB: IbcFirebaseProvider, public toastCtrl: ToastController,
        public common: CommonProvider, public content: DataProvider) {

        this.ministryRoles = common.text.chinese['ministry-roles'];

        this.ministrySkills = [];
        this.ministryRoles.forEach(mr => {
            let key = mr.key.replace(/\d+$/, '');
            let caption = mr.caption.replace(/\d+$/, '');
            let existing = this.ministrySkills.filter(ms => ms.key == key)[0];
            if (!existing) {
                this.ministrySkills.push({key, caption});
            }
        });

        this.ibcFB.afDB.database.ref(`urls`).once('value', snapshot => {
            let urls = snapshot.val();
            this.publishUrl = urls.ministry;
        });

        this.content.ibcFB.userProfile$.subscribe(auth => {
            // console.log("========== user profile changed! ============");
            setTimeout(() => {
                this.subscribe();
            }, 1000)
        });
    }

    getCandidates(role) {
        if (!role || !role.key) return [];
        let key = role.key.replace(/\d+$/, '');
        return this.allContacts.filter(contact => contact.skills && contact.skills.indexOf(key) > -1);
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

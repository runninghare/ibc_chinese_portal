import { Injectable } from '@angular/core';
import { DataProvider, IntListItem } from '../../providers/data-adaptor/data-adaptor';
// import { DataProvider, IntPopupTemplateItem, IntSummaryData, IntListItem } from '../../providers/data-adaptor/data-adaptor';
import { MinistryProvider } from '../../providers/ministry/ministry';
import * as moment from 'moment';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

    constructor(public content: DataProvider, public ministrySvc: MinistryProvider) {
    }

    parseMustache(s: string): string {
        if (!s) return s;
        let content = this.content;
        if (content) {} // A trick to avoid tslint warning.
        return s.replace(/{{([^{}]*)}}/g, (m0, m1) => eval('content.' + m1));
    }

    parseItemMustache(item: IntListItem): IntListItem {
        if (!item) return null;
        let result: IntListItem = {};
        Object.keys(item).forEach(k => {
            let v = item[k];
            if (typeof v == 'string') {
                result[k] = this.parseMustache(v);
            } else {
                result[k] = v;
            }
        });
        return result;
    }

    addNotification(contactId: string, item: IntListItem) {
        this.content.myTasksDB.parent.child(`${contactId}`).child(`${item.key}`).once('value', snapshot => {
            let found = snapshot.val();

            // console.log('--- found ---');
            // console.log(found);

            if (!found || found.value != item.value || found.answer != item.answer) {
                // console.log(`${found && found.value} <=> ${item.value}`);
                this.content.myTasksDB.parent.child(`${contactId}`).child(`${item.key}`).set(Object.assign({}, this.parseItemMustache(item), {
                    isNew: true,
                    createdDT: moment().format('YYYY-MM-DD HH:mm:ss'),
                    sender: this.content.myselfContact.id,
                    avatar: this.content.myselfContact.photoURL
                })).then(() => {
                    this.processSpecialTask(item);
                }).catch(console.error);
            }
        });
    }

    addMyNotification(item: IntListItem) {
        this.addNotification(this.content.myselfContact.id, item);
    }

    removeNotification(contactId: string, itemKey: string) {
        this.content.myTasksDB.parent.child(`${contactId}`).child(`${itemKey}`).remove();
    }

    removeMyNotification(itemKey: string) {
        this.content.myTasksDB.child(`${itemKey}`).remove();
    }

    processSpecialTask(item: IntListItem): void {
        // console.log('--- process special task ---');
        // console.log(item);
        if (item.value && item.key && item.key.match(/\d{4}-\d{2}-\d{2}-confirm-service/)) {
            let date = item.key.replace(/(\d{4}-\d{2}-\d{2})-confirm-service/, '$1');
            if (!date) return;

            let ministryIndex = this.ministrySvc.ministrySheets.map(sheet => sheet.date).indexOf(date);

            if (ministryIndex > -1) {
                this.content.ministriesDB.child(`${ministryIndex}/confirm`).child(this.content.myselfContact.id).set(item.answer == 'yes' ? 1 : 0);
            }
        }
    }

}

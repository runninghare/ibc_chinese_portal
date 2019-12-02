import { Component } from '@angular/core';
import { ModalController, NavParams} from 'ionic-angular';
import { DataProvider, IntPopupTemplateItem, IntSummaryData, IntContact } from '../../providers/data-adaptor/data-adaptor';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the PopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup',
  templateUrl: 'popup.html',
  host: {
      class: 'bg-color-white'
  }
})
export class PopupComponent {

  pageTitle: string;
  definitions: IntPopupTemplateItem[]  = [];
  data: IntSummaryData = {};
  index: number;
  itemToEdit: any;
  itemKeys: string[];

  keys: string[] = [];

  /*
  
  A workaround for ionic's ion-input bug with type=number.
  Ionic always emit a string type, e.g. "200" instead of 200:
  https://github.com/ionic-team/ionic/issues/7121
   */
  public convertToNumber(event):number { 
    return +event; 
  }

  // hasKey(k: string): boolean {
  //     return this.definition[k] !== undefined;
  // }

  cancel(): void {
      let cancelFunc = this.navParams.get('cancel');
      if (typeof cancelFunc == 'function') {
          cancelFunc();
      }
  }

  isHidden(d) {
      if (typeof d.hidden == 'function') {
          return d.hidden(this.data);
      } else {
          return d.hidden;
      }
  }

  getCaption(lookupCaption: any, option: any): string {
    if (typeof lookupCaption == 'function') {
      return lookupCaption(option);
    } else {
      return option && option[lookupCaption];
    }
  }

  save(): void {
      let saveFunc: (IntSummaryData) => void = this.navParams.get('save');
      if (typeof saveFunc == 'function') {
          this.definitions.forEach(d => {
              if (d.type == 'boolean') {
                  /* Make sure False is set if the checkbox is empty */
                  this.data[d.key] = this.data[d.key] || false;
              }
          })
          saveFunc(this.data);
      }
  }

  fillterLookupSource(ev): void {
    let filterText = `${ev.target.value || ''}`.toLowerCase();
    // this.groupValues.forEach(gv => {
    //   this.mappedItemsFunc(gv);
    // });
  }

  selectMembers(item?: any, prop?: string): void {
    let ids = (item && prop && item[prop]) ? item[prop] : [];

    let memberRecipients = this.content.allContacts.filter(c => ids.indexOf(c.id) > -1);

    let modal = this.modalCtrl.create(ListPage, {
      type: Object.assign({}, this.content.contactsParams, {
        preselectedItemKeys: memberRecipients.map(c => c.username)
      })
    });
    modal.present();

    modal.onDidDismiss(data => {
      console.log(data);
      if (data && Array.isArray(data) && item && prop) {
        item[prop] = data.map(d => d.id);
      }
    });
  }

  getMembers(item?: any, prop?: string) {
    if (!item || !prop || !item[prop]) {
      return null;
    }

    let contacts = this.content.allContacts.filter(c => item[prop].indexOf(c.id) > -1).map(c => `${c.chinese_name} (${c.name})`);

    return contacts.join(', ');
  }

  constructor(public modalCtrl: ModalController, public navParams: NavParams, public content: DataProvider) {
    this.pageTitle = navParams.get('title');

    /* Initialization */
    this.definitions = navParams.get('definitions');
    this.index = navParams.get('index');
    this.itemToEdit = navParams.get('item');

    if (this.itemToEdit) {
        this.data = this.itemToEdit;
        console.log('=== itemToEdit ===');
        console.log(this.data);
    } else {
        this.data = {};
        this.definitions.forEach(d => {
            /* Firebase does not allow you to save a value of undefiend to key */
            this.data[d.key] = d.default === undefined ? null : d.default;
        });
    }
  }

}

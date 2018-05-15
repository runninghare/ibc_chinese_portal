import { Component } from '@angular/core';
import { ModalController, NavParams} from 'ionic-angular';
import { IntPopupTemplateItem, IntSummaryData } from '../../providers/data-adaptor/data-adaptor';

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
  itemKeys: string[];

  keys: string[] = []

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

  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
    this.pageTitle = navParams.get('title');

    /* Initialization */
    this.definitions = navParams.get('definitions');

    if (navParams.get('item')) {
        this.data = navParams.get('item');
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

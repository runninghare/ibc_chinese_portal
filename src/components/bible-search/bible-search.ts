import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the BibleSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bible-search',
  templateUrl: 'bible-search.html'
})
export class BibleSearchComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello BibleSearchComponent Component');
    this.text = 'Hello World';
  }

  selectionEmptyAll(): void {

  }

  selectionFillAll(): void {

  }

  dismiss(): void {
      this.viewCtrl.dismiss();
  }

  apply(): void {

  }

}

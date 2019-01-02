import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { BibleProvider, IntBibleChapter, IntBibleVerse } from '../../providers/bible/bible';

/**
 * Generated class for the BibleSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage({
    name: 'bible-search-page'
})
@Component({
  selector: 'bible-search',
  templateUrl: 'bible-search.html'
})
export class BibleSearchPage {

  searchKey: string;

  count: number;

  verses: IntBibleVerse[] = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public bibleSvc: BibleProvider) {
  }

  selectionEmptyAll(): void {

  }

  selectionFillAll(): void {

  }

  // dismiss(): void {
  //     this.viewCtrl.dismiss();
  // }

  search(): void {
      this.bibleSvc.search(this.searchKey).then(data => {
          this.verses = data.verses;
          this.count = data.count;
      });
  }

  navigate(verse: IntBibleVerse): void {
      this.navCtrl.push('bible-chapter-page', {
          bookNumber: verse.SN,
          chapterNumber: verse.ChapterSN,
          verseNumber: verse.VerseSN
      });
  }

  apply(): void {

  }

}

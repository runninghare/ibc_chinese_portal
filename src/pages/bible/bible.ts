import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleBookPage } from './bible-book';
import { BibleProvider, IntBibleBook } from '../../providers/bible/bible';
import { S2tProvider } from '../../providers/s2t/s2t';

/**
 * Generated class for the BiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface BibleID {
    SN: number;
    KindSN: number;
    ChapterNumber: number;
    NewOrOld: number;
    PinYin: string;
    ShortName: string;
    FullName: string;
    EnglishName: string;
};

@IonicPage({
    name: 'bible-page'
})
@Component({
    selector: 'page-bible',
    templateUrl: 'bible.html',
})
export class BiblePage {

    storage: SQLite;

    books: IntBibleBook[] = [];

    referenced: boolean;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public platform: Platform, 
        public s2t: S2tProvider,
        public bibleSvc: BibleProvider
        ) {

        this.referenced = this.navParams.get('referenced');

        this.platform.ready().then(() => {
            this.bibleSvc.getBooks().then(books => {
                this.books = books;
            }).catch(err => {
            });
        });

    }

    bookTapped(event, item): void {
        this.navCtrl.push('bible-book-page', {
            bookNumber: item.SN,
            item: item,
            referenced: this.referenced
        });
    }

    search(): void {
        this.navCtrl.push('bible-search-page');
        // let popupModal = this.modalCtrl.create(BibleSearchComponent);
        // popupModal.present();
    }    

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiblePage');
    }

}

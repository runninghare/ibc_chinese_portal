import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleProvider, IntBibleChapter, IntBibleVerse } from '../../providers/bible/bible';
import { BiblePage } from './bible';
import { BibleSearchComponent } from '../../components/bible-search/bible-search';

/**
 * Generated class for the BiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'bible-chapter-page',
    segment: 'bible/:bookNumber/:chapterNumber/:verseNumber',
    defaultHistory: ['bible-page', 'bible-book-page']
})
@Component({
    selector: 'page-bible-chapter',
    templateUrl: 'bible-chapter.html',
})
export class BibleChapterPage {

    @ViewChild(Navbar) navBar: Navbar;

    storage: SQLite;

    chapterMeta: IntBibleChapter;

    verses: IntBibleVerse[] = [];

    highlightVerseNumber: number;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public platform: Platform, 
        public bibleSvc: BibleProvider,
        public modalCtrl: ModalController
       ) {

        // console.log(JSON.stringify`(navParams));

        this.platform.ready().then(() => {

            this.chapterMeta = navParams.data.item;

            if (this.chapterMeta) {
                this.bibleSvc.getAChapter(this.chapterMeta.bookId, this.chapterMeta.chapter).then(verses => {
                    this.verses = verses;
                    setTimeout(() => {
                        this.scrollToHighlight();
                    }, 1000);
                });
            } else if (navParams.data.bookNumber && navParams.data.chapterNumber) {
                this.bibleSvc.getAChapter(navParams.data.bookNumber, navParams.data.chapterNumber).then(verses => {
                    this.verses = verses;

                    this.chapterMeta = {
                        book: this.verses[0].FullName,
                        bookId: this.verses[0].SN,
                        chapter: this.verses[0].ChapterSN
                    };

                    setTimeout(() => {
                        this.scrollToHighlight();
                    }, 1000);
                });
            }

            this.highlightVerseNumber = navParams.data.verseNumber;

        });

    }

    chapters(): void {
        this.navCtrl.push('bible-book-page', {
            bookNumber: this.chapterMeta.bookId,
        });
    }

    reference(): void {
        this.navCtrl.push(BiblePage, {referenced: 1});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiblePageBook');

        if (!this.navParams.data.item && this.navParams.data.bookNumber) {
            let lastView = this.navCtrl.getViews()[1];
            if (lastView && lastView.id == 'bible-book-page') {
                lastView.data.bookNumber = this.navParams.data.bookNumber;
            }
        }

        if (this.navParams.get('referenced')) {
            this.navBar.backButtonClick = () => {
                let views = this.navCtrl.getViews();
                this.navCtrl.popTo(views[views.length-4]);
            };
        }        
    }

    scrollToHighlight(): void {
        let contentElem = document.querySelector('#bible-chapter-content .scroll-content');
        let highlightElem = document.querySelector('#bible-chapter-content .ibc-highlight');
        if (contentElem && highlightElem) {
            // console.log(contentElem);
            // console.log(highlightElem);
            contentElem.scrollTop = highlightElem['offsetTop'];
        }
    }

    search(): void {
        let popupModal = this.modalCtrl.create(BibleSearchComponent);
        popupModal.present();
    }

}

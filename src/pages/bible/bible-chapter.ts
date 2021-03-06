import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleProvider, IntBibleChapter, IntBibleVerse } from '../../providers/bible/bible';
import { BiblePage } from './bible';
import { WechatProvider } from '../../providers/wechat/wechat';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';

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
        public modalCtrl: ModalController,
        public content: DataProvider,
        public wechat: WechatProvider
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
        let contentElem = document.querySelectorAll('#bible-chapter-content .scroll-content')[document.querySelectorAll('#bible-chapter-content .scroll-content').length-1];
        // let highlightElem = contentElem.querySelectorAll('#bible-chapter-content .ibc-highlight');
        if (contentElem) {
            let highlightElem = contentElem.querySelector('.ibc-highlight');
            // console.log(contentElem);
            // console.log(highlightElem);
            if (highlightElem) {
                contentElem.scrollTop = highlightElem['offsetTop'];
            }
        }
    }

    search(): void {
        this.navCtrl.push('bible-search-page');
        // let popupModal = this.modalCtrl.create(BibleSearchComponent);
        // popupModal.present();
    }

    share(verseSN?: number): void {
        let bookId = this.chapterMeta.bookId;
        let chapterId = this.chapterMeta.chapter;
        let verseId = this.navParams.data.verseNumber || verseSN || 0;

        let url = `http://ibc.medocs.com.au/app/#/bible/${bookId}/${chapterId}/${verseId}`;

        let title = `经文分享：${this.chapterMeta.book} `;

        if (verseId) {
            title += `${chapterId}:${verseId}`;
        } else {
            title += `第${chapterId}章`;
        }

        this.wechat.weChatShareLink(url, title, verseId ? this.verses[verseId-1].Chinese : this.verses[0].Chinese,
            `http://ibc.medocs.com.au/img/IBC.ico`);
    }

}

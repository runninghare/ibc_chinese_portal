import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleProvider, IntBibleChapter, IntBibleVerse } from '../../providers/bible/bible';
import { BiblePage } from './bible';

/**
 * Generated class for the BiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-bible-chapter',
    templateUrl: 'bible-chapter.html',
})
export class BibleChapterPage {

    @ViewChild(Navbar) navBar: Navbar;

    storage: SQLite;

    chapterMeta: IntBibleChapter;

    verses: IntBibleVerse[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public platform: Platform, 
        public bibleSvc: BibleProvider,
       ) {

        // console.log(JSON.stringify`(navParams));

        if (navParams.data) {
            this.chapterMeta = navParams.data.item;
        }

        if (this.platform.is('mobileweb')) {
            this.verses = [];
        } else {
            this.platform.ready().then(() => {

                this.bibleSvc.getAChapter(this.chapterMeta.bookId, this.chapterMeta.chapter).then(verses => {
                    this.verses = verses;
                });

            });
        }

    }

    reference(): void {
        this.navCtrl.push(BiblePage, {referenced: 1});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiblePageBook');
        if (this.navParams.get('referenced')) {
            this.navBar.backButtonClick = () => {
                let views = this.navCtrl.getViews();
                this.navCtrl.popTo(views[views.length-4]);
            };
        }        
    }

}

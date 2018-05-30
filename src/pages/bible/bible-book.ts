import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleProvider, IntBibleBook, IntBibleChapter } from '../../providers/bible/bible';
import { BibleChapterPage } from './bible-chapter';

/**
 * Generated class for the BiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-bible-book',
    templateUrl: 'bible-book.html',
})
export class BibleBookPage {

    @ViewChild('title') title: ElementRef;

    storage: SQLite;

    book: IntBibleBook;

    chapters: number[] = [];

    referenced: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public bibleSvc: BibleProvider) {

        this.referenced = this.navParams.get('referenced');

        if (navParams.data) {
            this.book = navParams.data.item;
            for (let i = 1; i <= this.book.ChapterNumber; i++) {
                this.chapters.push(i);
            }
        }

        // console.log(JSON.stringify(navParams));

        // if (this.platform.is('mobileweb')) {
        //     this.books = [
        //         { SN: 1, KindSN: 1, ChapterNumber: 50, NewOrOld: 0, PinYin: 'CSJ', ShortName: '创', FullName: '创世纪' },
        //         { SN: 2, KindSN: 1, ChapterNumber: 40, NewOrOld: 0, PinYin: 'CAJ', ShortName: '出', FullName: '出埃及记' }
        //     ]
        // } else {
        //     this.platform.ready().then(() => {

        //         this.storage = new SQLite();

        //         this.storage.openDatabase({
        //             name: 'bible.db',
        //             location: 'default',
        //             createFromLocation: 1
        //         }).then(() => {
        //             console.log("=== SQLite Connected! ===");

        //             this.storage.executeSql("SELECT * from BibleID", []).then((data) => {
        //                 // console.log("Data received: ", data);
        //                 let rows = data.rows;
        //                 for (let i = 0; i < rows.length; i++) {
        //                     // console.log(JSON.stringify(rows.item(i)));
        //                     this.books.push(rows.item(i));
        //                 }
        //                 this.storage.close();
        //             }, (error) => {
        //                 console.error("Unable to execute sql", JSON.stringify(error));
        //                 this.storage.close();
        //             });

        //         }, () => {
        //             console.error("Can't connect to SQLite!");
        //             this.storage.close();
        //         });

        //     });
        // }

    }

    chapterTapped(event, item): void {
        this.navCtrl.push(BibleChapterPage, {
            item,
            referenced: this.referenced
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiblePageBook');
    }

}

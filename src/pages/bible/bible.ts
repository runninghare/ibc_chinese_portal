import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleBookPage } from './bible-book';
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
};

@IonicPage()
@Component({
    selector: 'page-bible',
    templateUrl: 'bible.html',
})
export class BiblePage {

    storage: SQLite;

    books: BibleID[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public s2t: S2tProvider) {

        if (this.platform.is('mobileweb')) {
            this.books = [
                { SN: 1, KindSN: 1, ChapterNumber: 50, NewOrOld: 0, PinYin: 'CSJ', ShortName: '創', FullName: '創世紀' },
                { SN: 2, KindSN: 1, ChapterNumber: 40, NewOrOld: 0, PinYin: 'CAJ', ShortName: '出', FullName: '出埃及記' }
            ]
        } else {
            this.platform.ready().then(() => {

                this.storage = new SQLite();

                this.storage.openDatabase({
                    name: 'bible.db',
                    location: 'default',
                    createFromLocation: 1
                }).then(() => {
                    console.log("=== SQLite Connected! ===");

                    this.storage.executeSql("SELECT * from BibleID", []).then((data) => {
                        // console.log("Data received: ", data);
                        let rows = data.rows;
                        for (let i = 0; i < rows.length; i++) {
                            // console.log(JSON.stringify(rows.item(i)));
                            let book: BibleID = rows.item(i);
                            book.ShortName = this.s2t.tranStr(book.ShortName, true);
                            book.FullName = this.s2t.tranStr(book.FullName, true);
                            this.books.push(book);
                        }
                        this.storage.close();
                    }, (error) => {
                        console.error("Unable to execute sql", JSON.stringify(error));
                        this.storage.close();
                    });

                }, () => {
                    console.error("Can't connect to SQLite!");
                    this.storage.close();
                });

            });
        }

    }

    bookTapped(event, item): void {
        this.navCtrl.push(BibleBookPage, {
            item: item
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiblePage');
    }

}

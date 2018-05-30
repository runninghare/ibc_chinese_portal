import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { BibleChapter } from './bible-book';
import { S2tProvider } from '../../providers/s2t/s2t';

/**
 * Generated class for the BiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface BibleVerse {
  ID: number;
  VolumeSN: number;
  ChapterSN: number;
  VerseSN: number;
  Chinese: string;
  English: string;
  SoundBegin: number;
  SoundEnd: number; 
}

@Component({
    selector: 'page-bible-chapter',
    templateUrl: 'bible-chapter.html',
})
export class BibleChapterPage {

    storage: SQLite;

    chapterMeta: BibleChapter;

    verses: BibleVerse[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public s2t: S2tProvider) {

        console.log(JSON.stringify(navParams));

        if (navParams.data) {
            this.chapterMeta = navParams.data.item;
        }

        if (this.platform.is('mobileweb')) {
            this.verses = [];
        } else {
            this.platform.ready().then(() => {

                this.storage = new SQLite();

                this.storage.openDatabase({
                    name: 'bible.db',
                    location: 'default',
                    createFromLocation: 1
                }).then(() => {
                    console.log("=== SQLite Connected! ===");

                    this.storage.executeSql(`SELECT * from Bible where VolumeSN = ${this.chapterMeta.bookId} and ChapterSN = ${this.chapterMeta.chapter}`, []).then((data) => {
                        // console.log("Data received: ", data);
                        let rows = data.rows;
                        for (let i = 0; i < rows.length; i++) {
                            // console.log(JSON.stringify(rows.item(i)));
                            let verse: BibleVerse = rows.item(i);
                            verse.Chinese = this.s2t.tranStr(verse.Chinese, true);
                            verse.English = verse.English && verse.English.replace(/\\/g,'');
                            this.verses.push(verse);
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad BiblePageBook');
    }

}

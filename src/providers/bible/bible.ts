import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { S2tProvider } from '../s2t/s2t';
import { CommonProvider } from '../../providers/common/common';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';

export interface IntBibleBook {
    SN?: number;
    KindSN?: number;
    ChapterNumber?: number;
    NewOrOld?: number;
    PinYin?: string;
    ShortName?: string;
    FullName?: string;
    EnglishName?: string;
}

export interface IntBibleChapter {
    bookId?: number;
    book?: string;
    chapter?: number;
}

export interface IntBibleVerse extends IntBibleBook {
  ID?: number;
  VolumeSN?: number;
  ChapterSN?: number;
  VerseSN?: number;
  Chinese?: string;
  English?: string;
  SoundBegin?: number;
  SoundEnd?: number; 
}

/*
  Generated class for the BibleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BibleProvider {

    public storage: SQLite;

    public books: IntBibleBook[] = [];

    public useEnglish: boolean;

    public useTraditional: boolean; /* 0 for simplified, 1 for traditional */

    getDB(): Promise<any> {
        return this.storage.openDatabase({
            name: 'bible.db',
            location: 'default',
            createFromLocation: 1
        });
    }

    getBooks(): Promise<IntBibleBook[]> {
        if (this.commonSvc.isWeb) {
            this.books = [];
            return this.http.get('bible/summary').then(rows => {
                for (let i = 0; i < rows.length; i++) {
                    // console.log(JSON.stringify(rows.item(i)));
                    let book: IntBibleBook = rows[i];
                    // book.ShortName = this.s2t.tranStr(book.ShortName, true);
                    // book.FullName = this.s2t.tranStr(book.FullName, true);
                    this.books.push(book);
                }
                // console.log(this.books);
                return this.books;
            }, err => {
                console.error("Can't connect to Bible via http!");
                return [];
            });
        } else {
            return this.getDB().then(() => {
                console.log('--- DB loaded ---');
                this.books = [];
                return this.storage.executeSql("SELECT * from BibleID", []).then(data => {
                    let rows = data.rows;
                    for (let i = 0; i < rows.length; i++) {
                        // console.log(JSON.stringify(rows.item(i)));
                        let book: IntBibleBook = rows.item(i);
                        // book.ShortName = this.s2t.tranStr(book.ShortName, true);
                        // book.FullName = this.s2t.tranStr(book.FullName, true);
                        this.books.push(book);
                    }
                    // this.storage.close();
                    return this.books;
                }, err => {
                    console.error("Can't connect to SQLite!");
                    console.log(JSON.stringify(err, null, 2));
                    // this.storage.close();
                    return [];
                });
            });
        }
    }

    getAVerse(volumeSN: number, chapterSN: number, verseSN: number): Promise<IntBibleVerse> {
        if (this.commonSvc.isWeb) {
            return this.http.get(`bible?VolumeSN=${volumeSN}&ChapterSN=${chapterSN}&VerseSN=${verseSN}`).then(rows => {
                    if (rows && rows.length > 0) {
                        let verse: IntBibleVerse = rows[0];
                        // verse.Chinese = this.s2t.tranStr(verse.Chinese, true);
                        verse.English = verse.English && verse.English.replace(/\\/g, '');
                        verse.English = verse.English && verse.English.replace(/\{[^{}]*\}/g, '');
                        return verse;
                    } else {
                        throw('Error: cannot find the verse');
                    }
                }, (error) => {
                    console.error("Unable to execute sql", JSON.stringify(error));
                    return null;
                });
        } else {
            return this.getDB().then(() => {
                  return Promise.all([
                      this.storage.executeSql(`SELECT * from Bible where VolumeSN = ${volumeSN} and ChapterSN = ${chapterSN} and VerseSN = ${verseSN}`, []),
                      this.storage.executeSql(`SELECT * from BibleID where SN = ${volumeSN}`, [])
                      ]).then(res => {
                          let rows1 = res[0].rows;
                          let rows2 = res[1].rows;

                          if (rows1.length > 0 && rows2.length > 0) {
                              let verse = rows1.item(0);
                              verse.English = verse.English && verse.English.replace(/\\/g, '');
                              verse.English = verse.English && verse.English.replace(/\{[^{}]*\}/g, '');
                              verse = Object.assign({}, verse, rows2.item(0));
                              // this.storage.close();
                              return verse;
                          } else {
                              throw('Error: cannot find the verse');
                          }
                      }, error => {
                          console.error("Unable to execute sql", JSON.stringify(error));
                          // this.storage.close();
                      });
/*                return this.storage.executeSql(`SELECT * from Bible join BibleID on Bible.VolumeSN = BibleID.SN where VolumeSN = ${volumeSN} and ChapterSN = ${chapterSN}`, []).then((data) => {
                    // console.log("Data received: ", data);
                    let rows = data.rows;
                    for (let i = 0; i < rows.length; i++) {
                        // console.log(JSON.stringify(rows.item(i)));
                        let verse: IntBibleVerse = rows.item(i);
                        // verse.Chinese = this.s2t.tranStr(verse.Chinese, true);
                        verse.English = verse.English && verse.English.replace(/\\/g, '');
                        verse.English = verse.English && verse.English.replace(/\{[^{}]*\}/g, '');
                        verses.push(verse);
                    }
                    this.storage.close();
                    return verses;
                }, (error) => {
                    console.error("Unable to execute sql", JSON.stringify(error));
                    this.storage.close();
                    return null;
                });*/
            });
        }
    }    

    getAChapter(volumeSN: number, chapterSN: number): Promise<IntBibleVerse[]> {
        if (this.commonSvc.isWeb) {
            return this.http.get(`bible?VolumeSN=${volumeSN}&ChapterSN=${chapterSN}`).then(rows => {
                    let verses: IntBibleVerse[] = [];
                    // console.log("Data received: ", data);
                    for (let i = 0; i < rows.length; i++) {
                        // console.log(JSON.stringify(rows.item(i)));
                        let verse: IntBibleVerse = rows[i];
                        // verse.Chinese = this.s2t.tranStr(verse.Chinese, true);
                        verse.English = verse.English && verse.English.replace(/\\/g, '');
                        verse.English = verse.English && verse.English.replace(/\{[^{}]*\}/g, '');
                        verses.push(verse);
                    }
                    return verses;
                }, (error) => {
                    console.error("Unable to execute sql", JSON.stringify(error));
                    return null;
                });
        } else {
            return this.getDB().then(() => {
                let verses: IntBibleVerse[] = [];
                return this.storage.executeSql(`SELECT * from Bible join BibleID on Bible.VolumeSN = BibleID.SN where Bible.VolumeSN = ${volumeSN} and ChapterSN = ${chapterSN}`, []).then((data) => {
                    // console.log("Data received: ", data);
                    let rows = data.rows;
                    for (let i = 0; i < rows.length; i++) {
                        // console.log(JSON.stringify(rows.item(i)));
                        let verse: IntBibleVerse = rows.item(i);
                        // verse.Chinese = this.s2t.tranStr(verse.Chinese, true);
                        verse.English = verse.English && verse.English.replace(/\\/g, '');
                        verse.English = verse.English && verse.English.replace(/\{[^{}]*\}/g, '');
                        verses.push(verse);
                    }
                    // this.storage.close();
                    return verses;
                }, (error) => {
                    console.error("Unable to execute sql", JSON.stringify(error));
                    // this.storage.close();
                    return null;
                });
            });
        }
    }

    getVerse() {
        let booksPromise = this.books.length > 0 ? new Promise((resolve, reject) => {
            resolve(this.books);
        }) : this.getBooks();

        booksPromise.then(books => {
        })
    }

    search(keyword: string): Promise<{count: number, verses: IntBibleVerse[]}> {
        // let searchKey = keyword;
        let searchKey = this.s2t.tranStr(keyword, false);
        if (searchKey) {
            searchKey = searchKey.replace(/^\s*|\s*$/, '');
        }
        if (this.commonSvc.isWeb) {
            return this.http.post(`bible/search`, {keyword: searchKey}).then(verses => {
                verses.forEach(verse => {
                    verse.English = verse.English && verse.English.replace(/\\/g, '');
                });
                return { count: verses.length, verses: verses.sort((a: IntBibleVerse,b: IntBibleVerse) => 
                    a.SN < b.SN ? -1 : 
                    a.SN > b.SN ? 1 : 
                    a.ChapterSN < b.ChapterSN ? -1 : 
                    a.ChapterSN > b.ChapterSN ? 1 :
                    a.VerseSN < b.VerseSN ? -1 : 
                    a.VerseSN > b.VerseSN ? 1 :
                    0) };
            });
        } else {
            return this.getDB().then(() => {
                return this.storage.executeSql(
                    `SELECT * from Bible join BibleID on Bible.VolumeSN == BibleID.SN where Bible.English like '%${searchKey}%' or Bible.Chinese like '%${searchKey}%'`, [])
                    .then((data) => {
                        let verses = [];
                        console.log("Data received: ", data);
                        let rows = data.rows;
                        for (let i = 0; i < rows.length; i++) {
                            // console.log(JSON.stringify(rows.item(i)));
                            let verse: IntBibleVerse = rows.item(i);
                            // verse.Chinese = this.s2t.tranStr(verse.Chinese, true);
                            verse.English = verse.English && verse.English.replace(/\\/g, '');
                            verse.English = verse.English && verse.English.replace(/\{[^{}]*\}/g, '');
                            verses.push(verse);
                        }
                        // this.storage.close();
                        return {
                            count: verses.length,
                            verses: verses.sort((a: IntBibleVerse, b: IntBibleVerse) =>
                                a.SN < b.SN ? -1 :
                                    a.SN > b.SN ? 1 :
                                        a.ChapterSN < b.ChapterSN ? -1 :
                                            a.ChapterSN > b.ChapterSN ? 1 :
                                                a.VerseSN < b.VerseSN ? -1 :
                                                    a.VerseSN > b.VerseSN ? 1 :
                                                        0)
                        };
                    }, (error) => {
                        console.error("Unable to execute sql", JSON.stringify(error));
                        // this.storage.close();
                        return null;
                    })
            });
        }
    }

    s2tConvert(text: string): string {
        return this.s2t.tranStr(text, true);
    }

    constructor(public s2t: S2tProvider, public commonSvc: CommonProvider, public http: IbcHttpProvider) {
        this.storage = new SQLite();

//         var db = null;

// document.addEventListener('deviceready', function() {
//   db = window.sqlitePlugin.openDatabase({
//     name: 'my.db',
//     location: 'default',
//   });
// });
    }

}

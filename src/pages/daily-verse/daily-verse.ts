import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider, IntDailyVerse } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { BibleProvider, IntBibleChapter, IntBibleVerse } from '../../providers/bible/bible';
import * as moment from 'moment';

/**
 * Generated class for the DailyVersePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'daily-verse-page',
    segment: 'daily-verse/:date'
})
@Component({
  selector: 'page-daily-verse',
  templateUrl: 'daily-verse.html',
})
export class DailyVersePage {

  date: string;

  dailyVerses: IntDailyVerse[] = [];

  currentVerse: IntDailyVerse;

  currentBibleVerse: IntBibleVerse;

  bgImageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public content: DataProvider, public bibleSvc: BibleProvider, public common: CommonProvider) {
      this.date = moment(navParams.get('date')).format('M月D日');

      this.content.dailyVerses$.subscribe(dailyVerses => {
          this.dailyVerses = dailyVerses;
          this.currentVerse = dailyVerses.filter(d => d.datetime == navParams.get('date'))[0];
          if (this.currentVerse) {
              this.fetchBibleVerse(this.currentVerse.bookSN, this.currentVerse.chapterSN, this.currentVerse.verseSN);
          }
      });
  }

  get randomBg(): string {
      return `home-bg-${Math.round(Math.random()*10)}`;
  }

  fetchBibleVerse(bookSN, chapterSN, verseSN): void {

      if (this.currentVerse.thumbnail && !this.currentVerse.thumbnail.match(/IBC.ico$/)) {
          this.bgImageUrl = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${this.currentVerse.thumbnail})`;
          // this.bgImageUrl = 'url(https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_14/are_you_there_god.jpg?quality=89&w=800)';
      } else {
          this.bgImageUrl = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(assets/img/${this.randomBg}.jpg)`;
      }

      this.bibleSvc.getAChapter(bookSN, chapterSN).then(verses => {
          if (!verses) return;
          this.currentBibleVerse = verses.filter(v => v.VerseSN == verseSN)[0];
      })
  }

  prev(): void {
      let index = this.dailyVerses.indexOf(this.currentVerse);
      if (index - 1 >= 0) {
          this.currentVerse = this.dailyVerses[index-1];
          this.date = moment(this.currentVerse.datetime).format('M月D日');
          this.fetchBibleVerse(this.currentVerse.bookSN, this.currentVerse.chapterSN, this.currentVerse.verseSN);
      }
  }  

  next(): void {
      let index = this.dailyVerses.indexOf(this.currentVerse);
      if (index + 1 < this.dailyVerses.length) {
          this.currentVerse = this.dailyVerses[index+1];
          this.date = moment(this.currentVerse.datetime).format('M月D日');
          this.fetchBibleVerse(this.currentVerse.bookSN, this.currentVerse.chapterSN, this.currentVerse.verseSN);
      }
  }

  navigate(): void {
      this.navCtrl.push('bible-chapter-page', {bookNumber: this.currentVerse.bookSN, chapterNumber: this.currentVerse.chapterSN, verseNumber: this.currentVerse.verseSN});
  }

  back(): void {
      this.navCtrl.setRoot('home-page');
  }

  chat(): void {
      if (!this.currentVerse || !this.currentVerse.chatId) return;
      this.navCtrl.push('chat-page', {partnerId: this.currentVerse.chatId});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyVersePage');
  }

}

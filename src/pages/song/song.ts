import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';

/**
 * Generated class for the SongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'song-page',
  segment: 'song/:id'
})
@Component({
  selector: 'page-song',
  templateUrl: 'song.html',
})
export class SongPage {

  album: string;
  title: string;
  id: string;
  set: any;
  lyric: string;
  language: string;

  activeSong: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public videoSvc: VideoProvider, public content: DataProvider) {
      this.id = navParams.get('id');
      this.album = navParams.get('album');
      this.title = navParams.get('title');
      this.set = navParams.get('set');
      this.lyric = navParams.get('lyric');
      this.language = navParams.get('language');

      this.content.songs$.subscribe(songs => {
        this.activeSong = songs.filter(s => s.id == this.id)[0];
      })
  }

  play(): void {
      this.videoSvc.play(this.id);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SongPage');
  }

}

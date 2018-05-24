import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';

/**
 * Generated class for the SongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public videoSvc: VideoProvider) {
      this.id = navParams.get('id');
      this.album = navParams.get('album');
      this.title = navParams.get('title');
      this.set = navParams.get('set');
      this.lyric = navParams.get('lyric');
      this.language = navParams.get('language');
  }

  play(): void {
      this.videoSvc.play(this.id);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SongPage');
  }

}

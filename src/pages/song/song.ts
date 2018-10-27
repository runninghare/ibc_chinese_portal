import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { WechatProvider } from '../../providers/wechat/wechat';

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
  host: {
    class: 'ibc-allow-text-select'
  }
})
export class SongPage {

  album: string;
  title: string;
  id: string;
  set: any;
  lyric: string;
  language: string;

  activeSong: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonSvc: CommonProvider,
    public content: DataProvider, public wechat: WechatProvider) {
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

  share(): void {
    let url = `http://ibc.medocs.com.au/app/#/song/${this.id}`;
    let info = `Set ${this.activeSong.set}`;
    if (this.activeSong.album) {
      info += ` - 专辑: ${this.activeSong.album}`;
    }
    if (this.activeSong.language) {
      info += ` (${this.activeSong.language})`;
    }
    this.wechat.weChatShareLink(url, `诗歌分享: ${this.activeSong.name}`, info, 
        `https://img.youtube.com/vi/${this.id}/0.jpg`);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SongPage');
  }

}

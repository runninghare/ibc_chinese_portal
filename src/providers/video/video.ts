import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';

export interface IntSongInfo {
    name: string;
    id: string;
    nextService?: boolean;
}

/*
  Generated class for the VideoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoProvider {

    constructor(
        public platform: Platform,
        public youtube: YoutubeVideoPlayer, 
        public ibcFB: IbcFirebaseProvider) {

        this.ibcFB.afDB.list('songs').valueChanges().subscribe((res: IntSongInfo[]) => {
            this._songList = res;
            this.ibcFB.afDB.list('nextServiceSongs').valueChanges().subscribe((res: string[]) => {
                this.nextServiceSongs = this._songList.filter(s => res.filter(nss => nss == s.id).length > 0);
            });
        });

    }

    _songList: IntSongInfo[] = [];

    nextServiceSongs: IntSongInfo[] = [];

    get songList(): IntSongInfo[] {
        return this._songList;
        // return [
        //     {
        //         id: 'AjL3gfY9SOA',
        //         name: "陪我走過春夏秋冬"
        //     },
        //     {
        //         id: '_koWe28jUTo',
        //         name: "一粒麥子"
        //     },
        //     {
        //         id: "JnXaTrJtbUA",
        //         name: "不變的應許"
        //     },
        //     {
        //         id: "ELKqLAPT1Wg",
        //         name: "陪我"
        //     }
        // ]
    }

    play(id: string) {
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
        } else {
            (<any>this.youtube.openVideo)(id, (result) => {
                if (result == 'error') {
                    window['InAppYouTube'].openVideo(id, {
                        fullscreen: true
                    });
                }
            });
        }
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';

declare var cordova;

const soundFileMap = {
    loginOk: 'assets/sounds/login-ok.mp3',
    logoutOk: 'assets/sounds/logout-ok.mp3',
    incomingAlert: 'assets/sounds/incoming-alert.wav',
    incomingCall: 'assets/sounds/incoming-call.wav',
    incomingMessage: 'assets/sounds/incoming-message-wechat.wav',
    messageSent: 'assets/sounds/message-sent-wechat.wav',
    newGuest: 'assets/sounds/new-guest.wav',
    outcomingCall: 'assets/sounds/outcoming-call.wav',
    startChatting: 'assets/sounds/start-chatting.wav',
};

const mediaSounds = {};

/*
  Generated class for the AudioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioProvider {

    dummySuccess = () => { };

    get isWeb(): boolean {
        return this.platform.is('core') || this.platform.is('mobileweb');
    }

    get isMobile(): boolean {
        return !this.isWeb;
    }

    constructor(public nativeAudio: NativeAudio, public platform: Platform, @Inject(forwardRef(() => File)) public file: File, public media: Media) {

        /* iOS 's native audio player just doesn't work iOS 11.0.2 + Cordova-ios: 4.5.4*/
        // if (this.isMobile) {
        //     Object.keys(soundFileMap).forEach(k => {
        //         this.nativeAudio.preloadSimple(k, 'cdvfile://localhost/bundle/www/' + soundFileMap[k]).then(() => { }, err => console.log(`--- error loading sound file: ${appPath + soundFileMap[k]}`));
        //     });
        // }

    }

    play(k: string): void {
        if (this.isMobile) {
            /* iOS 's native audio player just doesn't work iOS 11.0.2 + Cordova-ios: 4.5.4*/
            // this.nativeAudio.play(k).then(this.dummySuccess, err => console.log(`Error: Failed to play sound ${k}`));
            this.file.resolveLocalFilesystemUrl(this.file.applicationDirectory + '/www/' + soundFileMap[k]).then(entry => {
                let cdvPath = entry.toInternalURL();
                let media: MediaObject = this.media.create(cdvPath);
                media.play();
            });
        }
    }

}

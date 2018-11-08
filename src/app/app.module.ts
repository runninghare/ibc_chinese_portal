import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from "ng2-img-cropper/index";
import { HttpClientModule } from '@angular/common/http';
import { IonicSelectableModule } from 'ionic-selectable';

import { CommonDirectivesModule } from '../directives/directives.module';
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { MinistryPageModule } from '../pages/ministry/ministry.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { ActivityPageModule } from '../pages/activity/activity.module';
import { AboutPageModule } from '../pages/about/about.module';
import { AdminSystemPageModule } from '../pages/admin-system/admin-system.module';
import { AdminSmsPageModule } from '../pages/admin-sms/admin-sms.module';
import { AdminNotifPageModule } from '../pages/admin-notif/admin-notif.module';
import { IframePageModule } from '../pages/iframe/iframe.module';
import { AboutAppPageModule } from '../pages/about-app/about-app.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { MapPageModule } from '../pages/map/map.module';
import { SongPageModule } from '../pages/song/song.module';
import { BiblePageModule } from '../pages/bible/bible.module';
import { MonthlyVersesPageModule } from '../pages/monthly-verses/monthly-verses.module';
import { SermonPageModule } from '../pages/sermon/sermon.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { IonicImageLoader } from 'ionic-image-loader';
import { Badge } from '@ionic-native/badge';


// import { SQLite } from '@ionic-native/sqlite';
import { SQLite } from 'ionic-native';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { HttpModule } from '@angular/http';

import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Base64 } from '@ionic-native/base64';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IbcFirebaseProvider } from '../providers/ibc-firebase/ibc-firebase';

// Google Authentication
import { GooglePlus } from '@ionic-native/google-plus';

// Local Services
import { S2tProvider } from '../providers/s2t/s2t';

import { IbcStyleProvider } from '../providers/ibc-style/ibc-style';
import { PhotoProvider } from '../providers/photo/photo';
import { MinistryProvider } from '../providers/ministry/ministry';
import { VideoProvider } from '../providers/video/video';
import { BrowserProvider } from '../providers/browser/browser';
import { DataProvider } from '../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../providers/common/common';

import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../providers/audio/audio';
import { Media } from '@ionic-native/media';
// import { Media, MediaObject } from '@ionic-native/media';
import { FileCacheProvider } from '../providers/file-cache/file-cache';
import { LoadTrackerProvider } from '../providers/load-tracker/load-tracker';
import { NotificationProvider } from '../providers/notification/notification';

import {ENV} from '@app/env';
import { BibleProvider } from '../providers/bible/bible';
import { WechatProvider } from '../providers/wechat/wechat';
import { IbcHttpProvider } from '../providers/ibc-http/ibc-http';

import { Deeplinks } from '@ionic-native/deeplinks';

import { SharedModule } from './shared.module';
import { IbcDeeplinkProvider } from '../providers/ibc-deeplink/ibc-deeplink';

// const firebaseConfig = {
//     apiKey: "AIzaSyDFkwr578ZYuu0PPQxd5MN2-OCh4O7oKtc",
//     authDomain: "resplendent-heat-6828.firebaseapp.com",
//     databaseURL: "https://resplendent-heat-6828.firebaseio.com",
//     projectId: "resplendent-heat-6828",
//     storageBucket: "resplendent-heat-6828.appspot.com",
//     messagingSenderId: "870700462998"
//   };

export function initializer(commonSvc: CommonProvider) {
  return () => {
      console.log(commonSvc);
    return commonSvc.resolve();
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ImageCropperModule,
    SharedModule,
    HomePageModule,
    AboutPageModule,
    AboutAppPageModule,
    ActivityPageModule,
    BiblePageModule,
    MonthlyVersesPageModule,
    SermonPageModule,
    ChatPageModule,
    ListPageModule,
    MapPageModule,
    MinistryPageModule,
    AdminSystemPageModule,
    AdminSmsPageModule,
    AdminNotifPageModule,
    IframePageModule,
    ContactPageModule,
    SongPageModule,
    UserProfilePageModule
  ],
  bootstrap: [IonicApp],
  providers: [
    File,
    FileOpener,
    FileTransfer,
    Base64,
    Media,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    S2tProvider,
    IbcFirebaseProvider,
    CommonProvider,
    GooglePlus,
    Camera,
    Crop,
    NativeAudio,
    SocialSharing,
    InAppBrowser,
    YoutubeVideoPlayer,
    IbcStyleProvider,
    PhotoProvider,
    MinistryProvider,
    VideoProvider,
    BrowserProvider,
    DataProvider,
    AudioProvider,
    LaunchNavigator,
    FileCacheProvider,
    LoadTrackerProvider,
    Badge,
    NotificationProvider,
    BibleProvider,
    IbcHttpProvider,
    WechatProvider,
    Deeplinks,
    IbcDeeplinkProvider,
    {
        provide: APP_INITIALIZER,
        useFactory: initializer,
        deps: [CommonProvider],
        multi: true
    }
  ]
})
export class AppModule {}

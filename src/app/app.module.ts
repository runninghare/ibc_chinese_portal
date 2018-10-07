import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from "ng2-img-cropper/index";
import { HttpClientModule } from '@angular/common/http';
import { IonicSelectableModule } from 'ionic-selectable';

import { PopupComponent } from '../components/popup/popup';
import { LoadTrackerComponent } from '../components/load-tracker/load-tracker';
import { IbcMapComponent } from '../components/ibc-map/ibc-map';
import { YoutubeVideoComponent } from '../components/youtube-video/youtube-video';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPageModule } from '../pages/list/list.module';
import { PhotoEditPage } from '../pages/photo-edit/photo-edit';
import { UserProfilePage, ModalSelectAvatar } from '../pages/user-profile/user-profile';
import { MinistryPage } from '../pages/ministry/ministry';
import { ContactPage } from '../pages/contact/contact';
import { HeaderPopoverPage } from '../pages/Popover/header';
import { BrowserPage } from '../pages/browser/browser';
import { ActivityPageModule } from '../pages/activity/activity.module';

import { AboutPageModule } from '../pages/about/about.module';
import { CommonDirectivesModule } from '../directives/directives.module';

import { AboutAppPage } from '../pages/about-app/about-app';
import { ChatPage } from '../pages/chat/chat';
import { MapPage } from '../pages/map/map';
import { SongPage } from '../pages/song/song';
import { EditorPage } from '../pages/editor/editor';

import { BiblePage } from '../pages/bible/bible';
import { BibleBookPage } from '../pages/bible/bible-book';
import { BibleChapterPage } from '../pages/bible/bible-chapter';

import { MonthlyVersesPageModule } from '../pages/monthly-verses/monthly-verses.module';

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

// const firebaseConfig = {
//     apiKey: "AIzaSyDFkwr578ZYuu0PPQxd5MN2-OCh4O7oKtc",
//     authDomain: "resplendent-heat-6828.firebaseapp.com",
//     databaseURL: "https://resplendent-heat-6828.firebaseio.com",
//     projectId: "resplendent-heat-6828",
//     storageBucket: "resplendent-heat-6828.appspot.com",
//     messagingSenderId: "870700462998"
//   };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    HeaderPopoverPage,
    PhotoEditPage,
    UserProfilePage,
    MinistryPage,
    BrowserPage,
    ChatPage,
    MapPage,
    SongPage,
    AboutAppPage,
    BiblePage,
    BibleBookPage,
    BibleChapterPage,
    EditorPage    
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
    AboutPageModule,
    ActivityPageModule,
    ListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    AboutAppPage,
    HeaderPopoverPage,
    PhotoEditPage,
    UserProfilePage,
    MinistryPage,
    BrowserPage,
    ChatPage,
    MapPage,
    SongPage,
    BiblePage,
    BibleBookPage,
    BibleChapterPage,
    EditorPage    
  ],
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
    Deeplinks
  ]
})
export class AppModule {}

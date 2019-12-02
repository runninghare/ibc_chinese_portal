import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from "ng2-img-cropper/index";
import { HttpClientModule } from '@angular/common/http';


import { CommonDirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { IonicImageLoader } from 'ionic-image-loader';

import { HttpModule } from '@angular/http';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ENV } from '@app/env';

import { ModalSelectAvatar } from '../pages/user-profile/user-profile';
import { MediaDownloaderComponent } from './media-downloader/media-downloader';
import { PopupComponent } from '../components/popup/popup';
import { LoadTrackerComponent } from '../components/load-tracker/load-tracker';
import { IbcMapComponent } from '../components/ibc-map/ibc-map';
import { YoutubeVideoComponent } from '../components/youtube-video/youtube-video';
import { IbcEditorComponent } from '../components/editor/editor';
import { BrowserComponent } from '../components/browser/browser';
import { PhotoEditComponent } from '../components/photo-edit/photo-edit';
import { HeaderPopOverComponent } from '../components/header-pop-over/header';
import { CommentComponent } from '../components/comment/comment';

import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridSheetModule } from 'wijmo/wijmo.angular2.grid.sheet';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@NgModule({
    declarations: [
        ModalSelectAvatar,
        MediaDownloaderComponent,
        PopupComponent,
        LoadTrackerComponent,
        IbcMapComponent,
        YoutubeVideoComponent,
        IbcEditorComponent,
        BrowserComponent,
        PhotoEditComponent,
        HeaderPopOverComponent,
        CommentComponent
    ],
    imports: [
        FormsModule,
        IonicModule,
        HttpClientModule,
        FlexLayoutModule,
        HttpModule,
        IonicImageLoader.forRoot(),
        AngularFireModule.initializeApp(ENV.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        ImageCropperModule,
        CommonDirectivesModule,
        PipesModule,
        WjGridModule,
        WjGridSheetModule,
        WjInputModule
    ],
    exports: [
        FormsModule,
        IonicModule,
        HttpClientModule,
        FlexLayoutModule,
        PipesModule,
        HttpModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        ImageCropperModule,
        CommonDirectivesModule,
        WjGridModule,
        WjGridSheetModule,
        WjInputModule,
        
        ModalSelectAvatar,
        MediaDownloaderComponent,
        PopupComponent,
        LoadTrackerComponent,
        IbcMapComponent,
        YoutubeVideoComponent,
        IbcEditorComponent,
        BrowserComponent,
        PhotoEditComponent,
        HeaderPopOverComponent,
        CommentComponent
    ],
    entryComponents: [
        ModalSelectAvatar,
        MediaDownloaderComponent,
        PopupComponent,
        LoadTrackerComponent,
        IbcMapComponent,
        YoutubeVideoComponent,
        IbcEditorComponent,
        BrowserComponent,
        PhotoEditComponent,
        HeaderPopOverComponent,
        CommentComponent
    ]
})
export class ComponentsModule { }

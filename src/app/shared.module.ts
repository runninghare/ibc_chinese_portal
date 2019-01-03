import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from "ng2-img-cropper/index";
import { HttpClientModule } from '@angular/common/http';

import { ModalSelectAvatar } from '../pages/user-profile/user-profile';

import { CommonDirectivesModule } from '../directives/directives.module';
import { MonthlyVersesPageModule } from '../pages/monthly-verses/monthly-verses.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { IonicImageLoader } from 'ionic-image-loader';

import { HttpModule } from '@angular/http';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { PopupComponent } from '../components/popup/popup';
import { LoadTrackerComponent } from '../components/load-tracker/load-tracker';
import { IbcMapComponent } from '../components/ibc-map/ibc-map';
import { YoutubeVideoComponent } from '../components/youtube-video/youtube-video';
import { IbcEditorComponent } from '../components/editor/editor';
import { BrowserComponent } from '../components/browser/browser';
import { PhotoEditComponent } from '../components/photo-edit/photo-edit';
import { HeaderPopOverComponent } from '../components/header-pop-over/header';
import { CommentComponent } from '../components/comment/comment';

import {ENV} from '@app/env';

@NgModule({
  declarations: [
    ModalSelectAvatar,
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
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    FlexLayoutModule,
    MonthlyVersesPageModule,
    HttpModule,
    IonicImageLoader.forRoot(),
    AngularFireModule.initializeApp(ENV.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ImageCropperModule,
    CommonDirectivesModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    ModalSelectAvatar,
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    FlexLayoutModule,
    PipesModule,
    MonthlyVersesPageModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ImageCropperModule,
    CommonDirectivesModule,
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
export class SharedModule {}

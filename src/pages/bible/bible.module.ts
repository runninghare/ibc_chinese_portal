import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiblePage } from './bible';
import { BibleBookPage } from './bible-book';
import { BibleChapterPage } from './bible-chapter';

@NgModule({
  declarations: [
    BiblePage,
    BibleBookPage,
    BibleChapterPage
  ],
  entryComponents: [
    BibleBookPage,
    BibleChapterPage
  ],
  imports: [
    IonicPageModule.forChild(BiblePage),
  ]
})
export class BiblePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiblePage } from './bible';
import { BibleBookPage } from './bible-book';
import { BibleChapterPage } from './bible-chapter';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        BiblePage,
        BibleBookPage,
        BibleChapterPage
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(BiblePage)
    ],
    exports: [
        BiblePage,
        BibleBookPage,
        BibleChapterPage
    ],
    entryComponents: [
        BiblePage,
        BibleBookPage,
        BibleChapterPage
    ],
})
export class BiblePageModule {}

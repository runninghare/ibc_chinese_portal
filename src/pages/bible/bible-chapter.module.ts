import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BibleChapterPage } from './bible-chapter';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        BibleChapterPage
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(BibleChapterPage)
    ],
    exports: [
        BibleChapterPage
    ],
    entryComponents: [
        BibleChapterPage
    ],
})
export class BibleChapterPageModule {}

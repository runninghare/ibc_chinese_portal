import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BibleBookPage } from './bible-book';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        BibleBookPage
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(BibleBookPage)
    ],
    exports: [
        BibleBookPage
    ],
    entryComponents: [
        BibleBookPage
    ],
})
export class BibleBookPageModule {}

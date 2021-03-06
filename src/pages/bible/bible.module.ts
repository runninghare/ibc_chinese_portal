import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiblePage } from './bible';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        BiblePage
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(BiblePage)
    ],
    exports: [
        BiblePage
    ],
    entryComponents: [
        BiblePage
    ],
})
export class BiblePageModule {}

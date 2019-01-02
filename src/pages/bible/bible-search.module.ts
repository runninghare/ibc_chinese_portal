import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BibleSearchPage } from './bible-search';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        BibleSearchPage
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(BibleSearchPage)
    ],
    exports: [
        BibleSearchPage
    ],
    entryComponents: [
        BibleSearchPage
    ],
})
export class BibleSearchPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyVersePage } from './daily-verse';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    DailyVersePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(DailyVersePage),
  ],
})
export class DailyVersePageModule {}

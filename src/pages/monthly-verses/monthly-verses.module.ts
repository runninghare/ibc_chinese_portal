import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlyVersesPage } from './monthly-verses';
import { IbcStyleProvider } from '../../providers/ibc-style/ibc-style';

@NgModule({
  declarations: [
    MonthlyVersesPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthlyVersesPage),
  ],
  providers: [
    IbcStyleProvider
  ]
})
export class MonthlyVersesPageModule {}

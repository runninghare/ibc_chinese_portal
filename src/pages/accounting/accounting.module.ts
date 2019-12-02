import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountingPage } from './accounting';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AccountingPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AccountingPage),
  ],
  exports: [AccountingPage],
  entryComponents: [AccountingPage]
})
export class AccountingPageModule {}

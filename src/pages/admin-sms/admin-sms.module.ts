import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSmsPage } from './admin-sms';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AdminSmsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AdminSmsPage),
  ],
  exports: [AdminSmsPage],
  entryComponents: [AdminSmsPage]
})
export class AdminSmsPageModule {}

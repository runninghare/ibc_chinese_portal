import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNotifPage } from './admin-notif';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AdminNotifPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AdminNotifPage)
  ],
})
export class AdminNotifPageModule {}

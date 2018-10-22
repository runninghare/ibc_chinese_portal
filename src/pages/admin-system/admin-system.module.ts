import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSystemPage } from './admin-system';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AdminSystemPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AdminSystemPage),
  ],
  exports: [AdminSystemPage],
  entryComponents: [AdminSystemPage]
})
export class AdminSystemPageModule {}

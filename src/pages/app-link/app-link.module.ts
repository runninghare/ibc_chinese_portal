import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppLinkPage } from './app-link';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AppLinkPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AppLinkPage),
  ],
  exports: [AppLinkPage],
  entryComponents: [AppLinkPage]
})
export class AppLinkPageModule {}

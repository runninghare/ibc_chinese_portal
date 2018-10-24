import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutAppPage } from './about-app';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AboutAppPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AboutAppPage)
  ],
  exports: [AboutAppPage],
  entryComponents: [AboutAppPage]
})
export class AboutAppPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AboutPage)
  ],
  exports: [AboutPage],
  entryComponents: [AboutPage]
})
export class AboutPageModule {}

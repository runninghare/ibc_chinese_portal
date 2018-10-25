import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(HomePage)
  ],
  exports: [HomePage],
  entryComponents: [HomePage]
})
export class HomePageModule {}

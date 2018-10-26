import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SermonPage } from './sermon';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    SermonPage,
  ],
  imports: [
    IonicPageModule.forChild(SermonPage),
    SharedModule
  ],
  exports: [SermonPage],
  entryComponents: [SermonPage]
})
export class SermonPageModule {}

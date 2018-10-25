import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinistryPage } from './ministry';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MinistryPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MinistryPage)
  ],
  exports: [MinistryPage],
  entryComponents: [MinistryPage]
})
export class MinistryPageModule {}

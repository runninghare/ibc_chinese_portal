import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from './activity';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ActivityPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ActivityPage)
  ],
  exports: [ActivityPage],
  entryComponents: [ActivityPage]
})
export class ActivityPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IframePage } from './iframe';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    IframePage
  ],
  imports: [
    IonicPageModule.forChild(IframePage),
    SharedModule
  ],
})
export class IframePageModule {}

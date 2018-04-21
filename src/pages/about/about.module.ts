import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { IbcStyleProvider } from '../../providers/ibc-style/ibc-style';
import { FlexLayoutModule } from '@angular/flex-layout';

export * from "./about";

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    FlexLayoutModule
  ],
  providers: [
    IbcStyleProvider
  ]
})
export class AboutPageModule {}

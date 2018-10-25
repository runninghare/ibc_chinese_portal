import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongPage } from './song';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    SongPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(SongPage)
  ],
  exports: [SongPage],
  entryComponents: [SongPage]
})
export class SongPageModule {}

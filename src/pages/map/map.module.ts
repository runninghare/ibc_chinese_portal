import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MapPage)
  ],
  exports: [MapPage],
  entryComponents: [MapPage]
})
export class MapPageModule {}

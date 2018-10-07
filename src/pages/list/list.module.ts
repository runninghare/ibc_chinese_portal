import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ListPage)
  ],
  exports: [ListPage],
  entryComponents: [ListPage]
})
export class ListPageModule {}
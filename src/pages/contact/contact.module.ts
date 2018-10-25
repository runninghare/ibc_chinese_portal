import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ContactPage)
  ],
  exports: [ContactPage],
  entryComponents: [ContactPage]
})
export class ContactPageModule {}

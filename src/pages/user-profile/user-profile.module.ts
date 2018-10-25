import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    UserProfilePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(UserProfilePage)
  ],
  exports: [UserProfilePage],
  entryComponents: [UserProfilePage]
})
export class UserProfilePageModule {}

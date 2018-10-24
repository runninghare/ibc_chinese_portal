import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ChatPage)
  ],
  exports: [ChatPage],
  entryComponents: [ChatPage]
})
export class ChatPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactLinkDirective } from './contact-link/contact-link';
import { MapLinkDirective } from './map-link/map-link';
import { OneTimeDirective } from './one-time/one-time';
import { ParseHtmlDirective } from './parse-html/parse-html';
import { QuestionDirective } from './question/question';

@NgModule({
  declarations: [
    ContactLinkDirective,
    MapLinkDirective,
    OneTimeDirective,
    ParseHtmlDirective,
    QuestionDirective
  ],
  exports: [
    ContactLinkDirective,
    MapLinkDirective,
    OneTimeDirective,
    ParseHtmlDirective,
    QuestionDirective
  ],
  imports: [
  ],
})
export class CommonDirectivesModule {}

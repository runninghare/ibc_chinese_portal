import { Directive, ElementRef, OnInit, Input, HostListener } from '@angular/core';
import { App, NavController, Platform } from 'ionic-angular';
import { DataProvider, IntContact} from '../../providers/data-adaptor/data-adaptor';
import { ContactPage } from '../../pages/contact/contact';
import * as $ from 'jquery';

/**
 * Generated class for the ContactLinkDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[contact-link]' // Attribute selector
})
export class ContactLinkDirective implements OnInit {

  @Input('contact-link') contact: IntContact;

  @HostListener('click') click(): void {
      if (this.contact) {
          this.navControler.push(ContactPage, {prefilter: contact => contact.id == this.contact.id});
      }
  }

  constructor(public el: ElementRef, public navControler: NavController) {
  }

  ngOnInit(): void {
      if (this.contact) {
          $(this.el.nativeElement).text(`${this.contact.name} (${this.contact.chinese_name})`);
      }
  }

}

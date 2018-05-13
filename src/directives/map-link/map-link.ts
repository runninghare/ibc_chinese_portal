import { Directive, ElementRef, OnInit, Input, HostListener  } from '@angular/core';
import { App, NavController, Platform } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';
import * as $ from 'jquery';

/**
 * Generated class for the MapDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[map-link]' // Attribute selector
})
export class MapLinkDirective implements OnInit {

  @Input('map-link') address: string;
  @Input('title') title: string;

  @HostListener('click') click(): void {
      if (this.address) {
        console.log(this.address);
        this.navControler.push(MapPage, {address: this.address, title: this.title});
      }
  }

  constructor(public el: ElementRef, public navControler: NavController) {
      console.log('Hello MapDirective Directive');
  }

  ngOnInit(): void {
      if (this.address) {
          console.log('--- directive ---');
          console.log(this.el.nativeElement);
          $(this.el.nativeElement).html(`<a href="#">${this.address}</a>`);
      }
  }

}

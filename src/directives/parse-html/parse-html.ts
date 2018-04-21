import { Directive, Input, OnInit, ElementRef, Host, Self, Optional } from '@angular/core';
import * as $ from 'jquery';

/**
 * Generated class for the ParseHtmlDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[parse-html]' // Attribute selector
})
export class ParseHtmlDirective implements OnInit {

    @Input('parse-html') parseHtml: string;

    constructor(@Host() @Self() @Optional() public elem: ElementRef) {
    }

    ngOnInit(): void {
        console.log('=== elem ===');
        console.log(this.parseHtml);
        $(this.elem.nativeElement).html(this.parseHtml);
    }

}

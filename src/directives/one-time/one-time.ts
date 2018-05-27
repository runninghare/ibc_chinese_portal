import { Directive, TemplateRef, ViewContainerRef, NgZone } from '@angular/core';

/**
 * One-time template rendering for simple {{}} templates, e.g.
 *
 * Hello <ng-template oneTime>{{name}}</ng-template>!
 */
@Directive({
  selector: '[one-time]',
})
export class OneTimeDirective {
  constructor(template: TemplateRef<any>, container: ViewContainerRef, zone: NgZone) {
    zone.runOutsideAngular(() => {
      const view = container.createEmbeddedView(template);
      setTimeout(() => view.detach());
    })
  }
}


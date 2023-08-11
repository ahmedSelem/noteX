import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAppPlaceholderDirective]',
  standalone: true
})
export class PlaceholderDirective {

  constructor(public viewContaineRef : ViewContainerRef) { }

}

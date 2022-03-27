import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-label',
    templateUrl: 'label.component.html'
})
export class LabelComponent {

  @Input() required : boolean;
  @Input() text: string;
  constructor(el: ElementRef) {
  }

}

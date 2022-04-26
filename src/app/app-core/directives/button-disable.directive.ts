import { Validators } from '@angular/forms';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[buttonDisable]'
})
export class ButtonDisableDirective {

  constructor(
    private _elementRef: ElementRef,
    private _rendered: Renderer2) {


  }

  @HostListener('click') onClick() {

    //console.log(this._elementRef)
    this._elementRef.nativeElement.innerHTML = '<span class="spinner-border spinner-border-sm" style="vertical-align: -2px"></span> Login'
    this._rendered.addClass(this._elementRef.nativeElement, 'disabled');

    setTimeout(() => {
      this._rendered.setAttribute(this._elementRef.nativeElement, 'disabled', 'disabled');
      setTimeout(() => {
        this._rendered.removeClass(this._elementRef.nativeElement, 'disabled');
        this._rendered.removeAttribute(this._elementRef.nativeElement, 'disabled');
        this._elementRef.nativeElement.innerHTML = 'Login'
      }, 2500);
    }, 0);

    //this._rendered.setStyle(this._elementRef.nativeElement,'background-color', 'red')
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDisableDirective } from './button-disable.directive';


@NgModule({
  declarations: [
    ButtonDisableDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonDisableDirective
  ]
})
export class DiretivesModule { }

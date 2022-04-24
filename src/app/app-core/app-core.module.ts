import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgePipe } from './pipes/age.pipe';
import { ButtonDisableDirective } from './directives/button-disable.directive';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { EncodePipe } from './pipes/encode.pipe';


@NgModule({
  declarations: [
    AgePipe,
    ButtonDisableDirective,
    EncodePipe

  ],
  imports: [
    CommonModule,
  ],
  exports:[
    CommonModule,
    AgePipe,
    EncodePipe,
    ButtonDisableDirective,

    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    NgBrazil,
    TextMaskModule,
  ]
})
export class AppCoreModule {
 }

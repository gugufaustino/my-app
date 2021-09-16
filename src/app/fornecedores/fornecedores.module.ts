import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresComponent } from './fornecedores.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);


@NgModule({
  declarations: [
    FornecedoresComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,
        
    RouterModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
  ],
  providers: []
})
export class FornecedoresModule { }

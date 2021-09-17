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
import { ListarComponent } from './listar/listar.component';
import { InserirComponent } from './inserir/inserir.component';
import { EditarComponent } from './editar/editar.component';
import { FornecedorService } from './services/fornecedor.service';
registerLocaleData(localePt);


@NgModule({
  declarations: [
    FornecedoresComponent,
    ListarComponent,
    InserirComponent,
    EditarComponent
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
  providers: [
    FornecedorService
  ]
})
export class FornecedoresModule { }

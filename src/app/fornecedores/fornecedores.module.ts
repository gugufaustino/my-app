import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresComponent } from './fornecedores.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { ListarComponent } from './listar/listar.component';
import { InserirComponent } from './inserir/inserir.component';
import { EditarComponent } from './editar/editar.component';
import { FornecedorService } from './services/fornecedor.service';
import { AppResolve } from '../services/app.resolve';
import { AppResolveService } from '../services/app.resolve.service';

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
    FornecedorService,
    AppResolve,
    { provide: AppResolveService, useExisting: FornecedorService },
  ]
})
export class FornecedoresModule { }

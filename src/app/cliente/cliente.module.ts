import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { ListarComponent } from './listar/listar.component';
import { InserirComponent } from './inserir/inserir.component';
import { ClienteService } from './services/cliente.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { EditarComponent } from './editar/editar.component';
import { AppResolve } from '../services/app.resolve';
import { AppResolveService } from '../services/app.resolve.service';


@NgModule({
  declarations: [
    ClienteComponent,
    ListarComponent,
    InserirComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,

    RouterModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
  ],
  providers: [
    ClienteService,
    AppResolve, 
    { provide: AppResolveService, useExisting: ClienteService }
  ]
})
export class ClienteModule { }

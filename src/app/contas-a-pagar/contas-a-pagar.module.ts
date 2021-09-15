import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { ContasAPagarRouteModule } from './contas-a-pagar.route';
import { ContasAPagarService, ServiceResolver } from './services/contas-a-pagar.service';
import { ContasAPagarResolve } from './services/contas-a-pagar.resolve';
import { ContasAPagarGuard } from './services/contas-a-pagar.guard';

import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { ContasAPagarAppComponent } from './contas-a-pagar.app.component';
import { NovoComponent } from './novo/novo.component';
import { Observable } from 'rxjs';
import { Pagamento } from './models/pagamento';


@NgModule({
  declarations: [
    ContasAPagarAppComponent,
    ListaComponent,
    EditarComponent,
    NovoComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    
    ContasAPagarRouteModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
  ],
providers: [
  ContasAPagarService,
  // ContasAPagarResolve,
  ContasAPagarGuard,
    { provide: ServiceResolver, useExisting: ContasAPagarService },
    { provide: ContasAPagarResolve, useClass: ContasAPagarResolve , deps: [ContasAPagarService] }
]})
export class ContasAPagarModule { }

// providers: [ { provide: ContasAPagarResolve, useClass: ContasAPagarResolve, deps: [ContasAPagarService], useExisting :ContasAPagarService  }]


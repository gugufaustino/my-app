import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { ContasAPagarAppComponent } from './contas-a-pagar.app.component';
import { RouterModule } from '@angular/router';
import { ContasAPagarRouteModule } from './contas-a-pagar.route';
import { ContasAPagarService } from './services/contas-a-pagar.service';
import { ContasAPagarResolve } from './services/contas-a-pagar.resolve';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NovoComponent } from './novo/novo.component';


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
  ContasAPagarResolve
]})
export class ContasAPagarModule { }

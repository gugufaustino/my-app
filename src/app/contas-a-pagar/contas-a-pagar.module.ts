import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaComponent } from './lista/lista.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { ContasAPagarAppComponent } from './contas-a-pagar.app.component';
import { RouterModule } from '@angular/router';
import { ContasAPagarRouteModule } from './contas-a-pagar.route';
import { ContasAPagarService } from './services/contas-a-pagar.service';



@NgModule({
  declarations: [
    ContasAPagarAppComponent,
    ListaComponent,
    DetalheComponent],
  imports: [
    CommonModule,
    RouterModule,
    ContasAPagarRouteModule
  ],
providers: [
  ContasAPagarService
]})
export class ContasAPagarModule { }

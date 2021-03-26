import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask'

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaAppComponent } from './conta.app.component';

import { ContaRoutingModulo } from './conta.route';



@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ContaRoutingModulo,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    NgBrazil,
    TextMaskModule
  ]
})
export class ContaModule { }

import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TextMaskModule } from 'angular2-text-mask'

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaAppComponent } from './conta.app.component';

import { ContaRoutingModulo } from './conta.route';
import { ContaService } from './services/conta.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiretivesModule } from '../app-core/diretives/diretives.module';



@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    DiretivesModule,
    CommonModule,
    RouterModule,
    NgbModule,

    ContaRoutingModulo,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
  ],
  providers :[
    ContaService
  ]

})
export class ContaModule { }

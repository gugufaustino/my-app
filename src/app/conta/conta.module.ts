import { NgModule } from '@angular/core';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaAppComponent } from './conta.app.component';

import { ContaRoutingModulo } from './conta-routing.module';
import { ContaService } from './services/conta.service';
import { AppCoreModule } from '../app-core/app-core.module';
import { CadastroAgenciaComponent } from './cadastro-agencia/cadastro-agencia.component';


@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent,
    CadastroAgenciaComponent
  ],
  imports: [
    AppCoreModule,
    ContaRoutingModulo,
  ],
  providers :[
    ContaService
  ]

})
export class ContaModule { }

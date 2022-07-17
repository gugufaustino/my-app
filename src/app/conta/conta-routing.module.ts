import { CadastroAgenciaComponent } from './cadastro-agencia/cadastro-agencia.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CadastroComponent } from "./cadastro/cadastro.component";
import { ContaAppComponent } from "./conta.app.component";
import { LoginComponent } from "./login/login.component";
import { CadastroAgenciaGuard  } from './services/cadastro-agencia.guard';

const contaRouterConfig: Routes = [{
    path: '', component: ContaAppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'cadastro-agencia', component: CadastroAgenciaComponent, canActivate: [CadastroAgenciaGuard], },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(contaRouterConfig)],
    exports: [RouterModule]
})

export class ContaRoutingModulo {

}

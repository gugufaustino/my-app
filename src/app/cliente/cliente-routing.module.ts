import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { InserirComponent } from './inserir/inserir.component';
import { ListarComponent } from './listar/listar.component';

const clmaimAcesso: string = 'CLIENTE';
const routes: Routes = [{
  path: '', component: ClienteComponent,
  children: [
    {
      path: 'listar', component: ListarComponent
      //  canActivate: [ContasAPagarGuard],
      //  data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },{
      path: 'inserir', component: InserirComponent
      //  canActivate: [ContasAPagarGuard],
      //  data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

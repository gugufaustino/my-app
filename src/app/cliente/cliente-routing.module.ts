import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolve } from '../services/app.resolve';
import { ClienteComponent } from './cliente.component';
import { EditarComponent } from './editar/editar.component';
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
    {
         path: 'editar/:id', component: EditarComponent, resolve: { model: AppResolve }
        //  canActivate: [ContasAPagarGuard],
        //  data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

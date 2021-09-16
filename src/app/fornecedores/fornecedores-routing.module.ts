import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './editar/editar.component';
import { FornecedoresComponent } from './fornecedores.component';
import { InserirComponent } from './inserir/inserir.component';
import { ListarComponent } from './listar/listar.component';

const clmaimAcesso :string = 'd';
const routes: Routes = [{
  path: '', component: FornecedoresComponent,
  children: [
    {
         path: 'listar', component: ListarComponent,
        //  canActivate: [ContasAPagarGuard],
        //  data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },
    {
         path: 'inserir', component: InserirComponent,
        //  canActivate: [ContasAPagarGuard],
        //  data: [{ claim: { nome: clmaimAcesso, valor: 'INSERIR' } }]
    },
    {
         path: 'editar', component: EditarComponent,
        //  canActivate: [ContasAPagarGuard],
        //  data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolve } from '../services/app.resolve';
import { EditarComponent } from './editar/editar.component';
import { FornecedoresComponent } from './fornecedores.component';
import { InserirComponent } from './inserir/inserir.component';
import { ListarComponent } from './listar/listar.component';
import { FornecedorGuard } from './services/fornecedor.guard';

const clmaimAcesso :string = 'FORNECEDOR';
const routes: Routes = [{
  path: '', component: FornecedoresComponent,
  children: [
    {
         path: 'listar', component: ListarComponent,
          canActivate: [FornecedorGuard],
          data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },
    {
         path: 'inserir', component: InserirComponent,
         canActivate: [FornecedorGuard], canDeactivate: [FornecedorGuard],
         data: [{ claim: { nome: clmaimAcesso, valor: 'INSERIR' } }]
    },
    {
         path: 'editar/:id', component: EditarComponent, resolve: { model: AppResolve },
         canActivate: [FornecedorGuard],
         data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }

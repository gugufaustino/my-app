import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedoresComponent } from './fornecedores.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [{
  path: '', component: FornecedoresComponent,
  children: [
    {
         path: 'listar', component: ListarComponent,
        //  canActivate: [ContasAPagarGuard],
        //  data: [{ claim: { nome: 'PAGAMENTO', valor: 'CONSULTAR' } }]
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }

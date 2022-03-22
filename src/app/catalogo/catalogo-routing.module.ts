import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolve } from '../services/app.resolve';
import { BaseGuard } from '../services/base.guard';
import { CatalogoComponent } from './catalogo.component';
import { EditarComponent } from './editar/editar.component';
import { InserirComponent } from './inserir/inserir.component';
import { ListarComponent } from './listar/listar.component';
import { CatalogoGuard } from './services/catalogo-m.guard';


const clmaimAcesso: string = 'CATALOGO';
const routes: Routes = [{
  path: '', component: CatalogoComponent,
  children: [
    {
      path: 'listar', component: ListarComponent,
      canActivate: [CatalogoGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },
    {
      path: 'editar/:id', component: EditarComponent, resolve: { pagamento: AppResolve },
      //canActivate: [ContasAPagarGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
    },
    {
      path: 'inserir', component: InserirComponent,
      //canActivate: [ContasAPagarGuard], canDeactivate: [ContasAPagarGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'INSERIR' } }]
    },
  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }

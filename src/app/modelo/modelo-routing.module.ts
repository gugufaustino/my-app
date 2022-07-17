import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolve } from '../services/app.resolve';
import { EditarComponent } from './editar/editar.component';
import { HomeComponent } from './home/home.component';
import { InserirComponent } from './inserir/inserir.component';
import { ModeloComponent } from './modelo.component';
import { ModeloGuard } from './services/modelo.guard';


const clmaimAcesso: string = 'MODELO';
const routes: Routes = [{
  path: '', component: ModeloComponent,
  children: [
    {
      path: '', component: HomeComponent,
      canActivate: [ModeloGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },

    {
      path: 'edit/:id', component: EditarComponent, resolve: { model: AppResolve },
      canActivate: [ModeloGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
    },
    {
      path: 'insert', component: InserirComponent,
      canActivate: [ModeloGuard], canDeactivate: [ModeloGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'INSERIR' } }]
    },
  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolve } from '../services/app.resolve';
import { EditarComponent } from './editar/editar.component';
import { InserirComponent } from './inserir/inserir.component';
import { HomeComponent } from './home/home.component';
import { CatalogoGuard } from './services/catalogo.guard';
import { CatalogoComponent } from './catalogo.component';


const clmaimAcesso: string = 'CATALOGO';
const routes: Routes = [{
  path: '', component: CatalogoComponent,
  children: [
    {
      path: '', component: HomeComponent,
      canActivate: [CatalogoGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },
    {
      path: 'editar/:id', component: EditarComponent, resolve: { model: AppResolve },
      canActivate: [CatalogoGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
    },
    {
      path: 'inserir', component: InserirComponent,
      canActivate: [CatalogoGuard], canDeactivate: [CatalogoGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'INSERIR' } }]
    },

  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }

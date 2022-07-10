import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModeloComponent } from './modelo.component';
import { ModeloGuard } from './services/modelo.guard';


const clmaimAcesso: string = 'CATALOGO';
const routes: Routes = [{
  path: '', component: ModeloComponent,
  children: [
    {
      path: '', component: HomeComponent,
      canActivate: [ModeloGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },


  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }

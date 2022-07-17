import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolve } from '../services/app.resolve';
import { HomeComponent } from './home/home.component';
import { CatalogoGuard } from './services/catalogo.guard';
import { CatalogoComponent } from './catalogo.component';


const clmaimAcesso: string = 'MODELO';
const routes: Routes = [{
  path: '', component: CatalogoComponent,
  children: [
    {
      path: '', component: HomeComponent,
      canActivate: [CatalogoGuard],
      data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
    },


  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }

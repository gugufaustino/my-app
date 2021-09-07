import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'conta', 
    loadChildren: () => import ('./conta/conta.module')
                                .then(m=> m.ContaModule)
  },
  { path: 'contas-a-pagar', 
    loadChildren: () => import ('./contas-a-pagar/contas-a-pagar.module')
                                .then(m=> m.ContasAPagarModule)
  },

  { path: 'acesso-negado', component: AcessoNegadoComponent},
  { path: 'nao-encontrado', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

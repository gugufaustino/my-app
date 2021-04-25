import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';

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
  } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

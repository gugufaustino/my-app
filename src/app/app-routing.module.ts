import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app-core/services/auth.guard';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { WelcomeComponent } from './navegacao/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'welcome', component: WelcomeComponent,
    canActivate: [AuthGuard],
    // data: [{ claim: { nome: 'PAGAMENTO', valor: 'CONSULTAR' } }]
  },
  { path: 'conta', loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule) },
  // { path: 'contas-a-pagar', loadChildren: () => import('./contas-a-pagar/contas-a-pagar.module').then(m => m.ContasAPagarModule) },
  // { path: 'fornecedores', loadChildren: () => import('./fornecedores/fornecedores.module').then(m => m.FornecedoresModule) },
  // { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'catalog', loadChildren: () => import('./catalogo/catalogo.module').then(m => m.CatalogoModule) },
  { path: 'models', loadChildren: () => import('./modelo/modelo.module').then(m => m.ModeloModule) },

  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

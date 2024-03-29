import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasAPagarGuard } from './contas-a-pagar/services/contas-a-pagar.guard';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { WelcomeComponent } from './navegacao/welcome/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    canActivate: [ContasAPagarGuard],
  },
  {
    path: 'welcome', component: WelcomeComponent,
    canActivate: [ContasAPagarGuard],
    // data: [{ claim: { nome: 'PAGAMENTO', valor: 'CONSULTAR' } }]
  },
  { path: 'conta', loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule) },
  { path: 'contas-a-pagar', loadChildren: () => import('./contas-a-pagar/contas-a-pagar.module').then(m => m.ContasAPagarModule) },
  { path: 'fornecedores', loadChildren: () => import('./fornecedores/fornecedores.module').then(m => m.FornecedoresModule) },
  { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'catalogo', loadChildren: () => import('./catalogo/catalogo.module').then(m => m.CatalogoModule) },

  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

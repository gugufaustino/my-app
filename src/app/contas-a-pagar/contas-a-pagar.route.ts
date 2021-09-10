import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContasAPagarAppComponent } from "./contas-a-pagar.app.component";
import { EditarComponent } from "./editar/editar.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { ContasAPagarGuard } from "./services/contas-a-pagar.guard";
import { ContasAPagarResolve } from "./services/contas-a-pagar.resolve";


const rotasContasAPagar: Routes = [{
    path: '',
    component: ContasAPagarAppComponent,
    children: [
        {
            path: 'lista', component: ListaComponent,
            canActivate: [ContasAPagarGuard],
            data: [{ claim: { nome: 'PAGAMENTO', valor: 'CONSULTAR' } }]// <<<--- permissao
        },
        {
            path: 'editar/:id', component: EditarComponent, resolve: { contaPgamento: ContasAPagarResolve },
            canActivate: [ContasAPagarGuard],
            data: [{ claim: { nome: 'PAGAMENTO', valor: 'EDITAR' } }] 
        },
        {
            path: 'novo', component: NovoComponent,
            canActivate: [ContasAPagarGuard],
            data: [{ claim: { nome: 'PAGAMENTO', valor: 'INSERIR' } }]
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(rotasContasAPagar)],
    exports: [RouterModule],
})

export class ContasAPagarRouteModule {

}

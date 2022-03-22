import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContasAPagarAppComponent } from "./contas-a-pagar.app.component";

import { EditarComponent } from "./editar/editar.component";
import { ListarComponent } from "./listar/listar.component";
import { InserirComponent } from "./inserir/inserir.component";
import { ContasAPagarGuard } from "./services/contas-a-pagar.guard";
import { AppResolve } from "../services/app.resolve";



const clmaimAcesso :string = 'PAGAMENTO';
const routes: Routes = [{
    path: '',
    component: ContasAPagarAppComponent,
    children: [
        {
            path: 'listar', component: ListarComponent,
            canActivate: [ContasAPagarGuard],
            data: [{ claim: { nome: clmaimAcesso, valor: 'CONSULTAR' } }]
        },
        {
            path: 'editar/:id', component: EditarComponent, resolve: { pagamento: AppResolve },
            canActivate: [ContasAPagarGuard],
            data: [{ claim: { nome: clmaimAcesso, valor: 'EDITAR' } }]
        },
        {
            path: 'inserir', component: InserirComponent,
            canActivate: [ContasAPagarGuard], canDeactivate: [ContasAPagarGuard],
            data: [{ claim: { nome: clmaimAcesso, valor: 'INSERIR' } }]
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContasAPagarRouteModule { }

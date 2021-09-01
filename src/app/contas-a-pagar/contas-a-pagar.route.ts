import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ContasAPagarAppComponent } from "./contas-a-pagar.app.component";
import { DetalheComponent } from "./detalhe/detalhe.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { ContasAPagarResolve } from "./services/contas-a-pagar.resolve";


const rotasContasAPagar: Routes = [{
    path: '',
    component:  ContasAPagarAppComponent,
    children: [
        { path: 'lista', component: ListaComponent },
        { path: 'detalhe/:id', component: DetalheComponent,
                resolve: {
                    contaPgamento: ContasAPagarResolve
            }    
        },
        { path: 'novo', component: NovoComponent },
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(rotasContasAPagar)],
    exports: [RouterModule],
})

export class ContasAPagarRouteModule {
    
}

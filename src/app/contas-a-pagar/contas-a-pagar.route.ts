import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ContasAPagarAppComponent } from "./contas-a-pagar.app.component";
import { EditarComponent } from "./editar/editar.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { ContasAPagarResolve } from "./services/contas-a-pagar.resolve";


const rotasContasAPagar: Routes = [{
    path: '',
    component:  ContasAPagarAppComponent,
    children: [
        { path: 'lista', component: ListaComponent },
        { path: 'editar/:id', component: EditarComponent,
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

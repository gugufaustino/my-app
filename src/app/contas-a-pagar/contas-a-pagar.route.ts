import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ContasAPagarAppComponent } from "./contas-a-pagar.app.component";
import { DetalheComponent } from "./detalhe/detalhe.component";
import { ListaComponent } from "./lista/lista.component";


const rotasContasAPagar: Routes = [{
    path: '',
    component:  ContasAPagarAppComponent,
    children: [
        { path: 'lista', component: ListaComponent },
        { path: 'detalhe', component: DetalheComponent }
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(rotasContasAPagar)],
    exports: [RouterModule],
})

export class ContasAPagarRouteModule {
    
}

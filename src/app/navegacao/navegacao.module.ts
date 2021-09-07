import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { NavegacaoService } from "./services/navegacao.service";
import { HttpClientModule } from "@angular/common/http";
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({    
    declarations: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        
        NotFoundComponent,
        AcessoNegadoComponent
        
    ], 
    imports : [
        CommonModule,
        RouterModule,
        NgbModule,
        
        HttpClientModule
    ],
    exports: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
        MenuLoginComponent                 
    ] ,
    providers:[
        NavegacaoService
    ]
})

export class NavegacaoModule {

}


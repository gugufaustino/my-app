import { UserComponent } from './user/user.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuComponent } from './menu/menu.component';
import { NavegacaoService } from "./services/navegacao.service";
import { HttpClientModule } from "@angular/common/http";
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        NavbarComponent,
        MenuComponent,
        UserComponent,
        HomeComponent,
        FooterComponent,

        NotFoundComponent,
        AcessoNegadoComponent,
        WelcomeComponent

    ],
    imports : [
        CommonModule,
        RouterModule,
        NgbModule,

        HttpClientModule
    ],
    exports: [
        NavbarComponent,
        MenuComponent,
        UserComponent,
        HomeComponent,
        FooterComponent,
    ] ,
    providers:[
        NavegacaoService
    ]
})

export class NavegacaoModule {

}


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from './menu-login/menu-login.component';

@NgModule({    
    declarations: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
        MenuLoginComponent
        
    ], 
    imports : [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
        MenuLoginComponent   
               
    ] 
})

export class NavegacaoModule {

}


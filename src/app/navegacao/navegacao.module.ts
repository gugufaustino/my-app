import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({    
    declarations: [
        MenuComponent,
        HomeComponent,
        FooterComponent
        
    ], 
    imports : [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        MenuComponent,
        HomeComponent,
        FooterComponent     
               
    ] 
})

export class NavegacaoModule {

}


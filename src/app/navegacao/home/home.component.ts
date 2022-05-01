import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/app-core/utils/localstorage";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    localStorageUtil = new LocalStorageUtils();

    constructor(private router: Router) { }

    ngOnInit(): void {

        if(!this.localStorageUtil.usuarioLogado()){
        // this.router.navigate(['/conta/login']);
        }

    }
}


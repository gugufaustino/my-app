import { NavigationBaseComponent } from 'src/app/app-core/components/navigation-base.component';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/app-core/utils/localstorage";
import { NavegacaoService } from "../services/navegacao.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent extends NavigationBaseComponent implements OnInit {

  user: any;
  constructor(private router: Router,
    private navegacaoService: NavegacaoService) {
      super();
  }
  ngOnInit(): void {
    this.user = this.localStorageUtils.obterUsuario();
    if (this.user){

    }
  }

}

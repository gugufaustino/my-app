import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/app-core/utils/localstorage";
import { NavegacaoService } from "../services/navegacao.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  user: any;

  private localStorageUtils = new LocalStorageUtils()

  constructor(private router: Router,
    private navegacaoService: NavegacaoService) {

  }
  ngOnInit(): void {
    this.user = this.localStorageUtils.obterUsuario();
    if (this.user){

    }
  }

  usuarioLogado(): boolean { return this.localStorageUtils.usuarioLogado(); }

}

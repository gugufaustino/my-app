import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { NavegacaoService } from '../services/navegacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {


  user: any;
  email: string = "";
  apelido: string = "";
  localStorageUtil = new LocalStorageUtils();

  constructor(private router: Router,
              private navegacaoService: NavegacaoService) { }

  ngOnInit(): void {
  }

  usuarioLogado(): boolean {
    this.user = this.localStorageUtil.obterUsuario();

    if (this.user)
      this.email = this.user.nome + " " + this.apelido;

    return this.localStorageUtil.usuarioLogado();
  }

}

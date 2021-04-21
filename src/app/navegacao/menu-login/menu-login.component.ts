import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styles: [
  ]
})
export class MenuLoginComponent implements OnInit {

  token: string | null = "";
  user: any;
  email: string = "";
  localStorageUtil = new LocalStorageUtils();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtil.obterToken();
    this.user = this.localStorageUtil.obterUsuario();

    if (this.user)
      this.email = this.user.nome;

    return this.token !== null;
  }
  logOut() {
    this.localStorageUtil.limparDadosLocaisUsuario()
    this.router.navigate(['/home']);
  }


}

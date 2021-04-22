import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/conta/models/usuario';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { NavegacaoService } from '../services/navegacao.service';

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
  apelido: string = "";
  localStorageUtil = new LocalStorageUtils();

  constructor(private router: Router,
              private navegacaoService: NavegacaoService) { }

  ngOnInit(): void {
  }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtil.obterToken();
    this.user = this.localStorageUtil.obterUsuario();

    if (this.user)
      this.email = this.user.nome + " " + this.apelido;

    return this.token !== null;
  }
  logOut() {
    this.localStorageUtil.limparDadosLocaisUsuario()
    this.router.navigate(['/home']);
  }

  obterPerfil(){
    let usuario: Usuario
    let tokeUser = this.localStorageUtil.obterUsuario();
      
    usuario = Object.assign({}, tokeUser)
      
     this.navegacaoService.obterApelido(usuario)
          .subscribe(
              sucesso => {  this.processaSucesso(sucesso) },
          );
  }

  private processaSucesso(response: any){
    this.apelido = response.apelido;
  }


}

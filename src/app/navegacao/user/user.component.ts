import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/conta/models/usuario';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { NavegacaoService } from '../services/navegacao.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

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
    this.user = this.localStorageUtil.obterUsuario();

    if (this.user)
      this.email = this.user.nome + " " + this.apelido;

    return this.localStorageUtil.usuarioLogado();
  }
  logOut() {
    this.localStorageUtil.limparDadosLocaisUsuario()
    this.router.navigate(['/conta/login']);
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
    this.apelido = response.apelido ?? '';
  }


}

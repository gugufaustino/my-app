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

  user: any;
  nome: string = "";
  papel: string = "";
  token: string | null = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router,
              private navegacaoService: NavegacaoService) { }

  ngOnInit(): void {
  }

  usuarioLogado(): boolean {
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user){
      this.nome = this.user.nome
    }

    return this.localStorageUtils.usuarioLogado();
  }
  logOut() {
    this.localStorageUtils.limparDadosLocaisUsuario()
    this.router.navigate(['/conta/login']);
  }

  obterPerfil(){
    let usuario: Usuario
    let tokeUser = this.localStorageUtils.obterUsuario();

    usuario = Object.assign({}, tokeUser)

     this.navegacaoService.obterApelido(usuario)
          .subscribe(
              sucesso => {  this.processaSucesso(sucesso) },
          );
  }

  private processaSucesso(response: any){
   // this.apelido = response.apelido ?? '';
  }


}

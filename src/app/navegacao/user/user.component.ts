import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCadastroEnum, Conta } from 'src/app/conta/models/conta';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { NavegacaoService } from '../services/navegacao.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {


  nome: string = "";
  abreviatura: string = "";
  papel: string = "";
  tipoAgencia: boolean = false;
  nomeFantasia: string = "";

  token: string | null = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router,
    private navegacaoService: NavegacaoService) { }

  ngOnInit(): void {
  }

  usuarioLogado(): boolean {
    const user = this.localStorageUtils.obterUsuario();

    if (user) {
      this.nome = user.nome;
      this.abreviatura = this.localStorageUtils.findClaim("abreviatura");
      this.papel = user.tipoCadastro == TipoCadastroEnum.Agente ? "Agente" : user.tipoCadastro == TipoCadastroEnum.Agencia ? "Administrador" : "NA";
      this.tipoAgencia = user.tipoCadastro == TipoCadastroEnum.Agencia;
      this.nomeFantasia = user.agencia?.nomeAgencia;
    }

    return this.localStorageUtils.usuarioLogado();
  }
  logOut() {
    this.localStorageUtils.limparDadosLocaisUsuario()
    this.router.navigate(['/conta/login']);
  }

  obterPerfil() {

    let tokeUser = this.localStorageUtils.obterUsuario();

    this.navegacaoService.obterApelido(tokeUser.email)
      .subscribe(
        sucesso => { this.processaSucesso(sucesso) },
      );
  }

  private processaSucesso(response: any) {
    // this.apelido = response.apelido ?? '';
  }


}

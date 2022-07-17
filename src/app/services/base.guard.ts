import { TipoCadastroEnum } from 'src/app/conta/models/usuario';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { IFormComponent } from '../app-core/interfaces/components/iform.component';


export abstract class BaseGuard {

  protected utilStorage = new LocalStorageUtils();
  constructor(protected router: Router) { }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    debugger;
    let encerrar = false;

    encerrar = this.verificarAutenticacao();
    if (encerrar) return false;

    encerrar = this.verificarCadastroAgenciaCompleto();
    if (encerrar) return false;

    encerrar = this.verificarAutorizacao(routeAc);
    if (encerrar) return false;

    return true;

  }

  canDeactivate(component: IFormComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
    }
    return true;
  }


  protected verificarAutenticacao() {

    if (!this.utilStorage.usuarioLogado()) {  //TODO #3 Colocar aqui uma validação do token no backend
      this.navegarLogon();
      return true;
    }
    return false;
  }

  protected verificarAutorizacao(routeAc: ActivatedRouteSnapshot) {
    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim'];

      if (claim) {
        let hasPermissao = this.utilStorage.possuiPermissao(claim.nome, claim.valor);
        if (!hasPermissao){
          this.navegarAcessoNegado();
          return true;
        }
      }
    }

    return false;
  }


  private navegarLogon() {
    this.router.navigate(['/conta/login/'], { queryParams: { returnUrl: this.router.url } });
  }
  private navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }

  protected verificarCadastroAgenciaCompleto() {

    const usuario = this.utilStorage.obterUsuario();
    if (usuario.tipoCadastro == TipoCadastroEnum.Agencia && usuario.empresa === null) {
      this.router.navigate(['/conta/cadastro-agencia']);

      return true;
    }

    return false;
  }

}

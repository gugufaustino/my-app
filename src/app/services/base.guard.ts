import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { IFormComponent } from '../app-core/interfaces/components/iform.component';


export abstract class BaseGuard {

  protected utilStorage = new LocalStorageUtils();
  constructor(protected router: Router) { }

  canActivate(routeAc: ActivatedRouteSnapshot) {

    this.verificarAutenticacao();

    this.verificarAutorizacao(routeAc);
    return true;

  }

  canDeactivate(component: IFormComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
    }
    return true;
  }

  protected verificarAutorizacao(routeAc: ActivatedRouteSnapshot) {
    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim'];

      if (claim) {
        let hasPermissao = this.utilStorage.possuiPermissao(claim.nome, claim.valor);
        if (!hasPermissao)
          this.navegarAcessoNegado();
      }
    }
  }


  protected verificarAutenticacao() {
    //TODO #3 Colocar aqui uma validação do token no backend
    if (!this.utilStorage.usuarioLogado()) {
      this.navegarLogon();
    }
  }

  private navegarLogon() {
    this.router.navigate(['/conta/login/'], { queryParams: { returnUrl: this.router.url } });
  }
  private navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }




}

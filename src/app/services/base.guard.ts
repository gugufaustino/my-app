import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';


export abstract class BaseGuard {

  private utilStorage = new LocalStorageUtils();
  constructor(protected router: Router) { }

  protected validarClaim(routeAc: ActivatedRouteSnapshot): boolean {

    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
      let claim = routeAc.data[0]['claim'];

      if (claim) {
        let hasPermissao = this.utilStorage.possuiPermissao(claim.nome, claim.valor)
        if (!hasPermissao)
          this.navegarAcessoNegado();
      }
    }
    return true;
  }

  private navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }
}

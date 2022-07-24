import { TipoCadastroEnum } from 'src/app/conta/models/conta';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { IFormComponent } from '../app-core/interfaces/components/iform.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DateUtils } from '../app-core/utils/date-utils';
import { AppInjector } from '../app.module';
import { ToastAppService } from './toastapp.service';


export abstract class BaseGuard {

  protected utilStorage = new LocalStorageUtils();
  constructor(protected router: Router,
    protected jwtHelper: JwtHelperService
  ) { }

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let returnUrl: string = state.url;
    let encerrar = false;

    encerrar = this.verificarAutenticacao(returnUrl);
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


  protected verificarAutenticacao(returnUrl:string) {

    console.log("date:", DateUtils.Format(this.jwtHelper.getTokenExpirationDate()!, 'DD/MM/yyyy HH:mm:ss', true),"expirado:", this.jwtHelper.isTokenExpired()!)


    if (!this.utilStorage.usuarioLogado()) {
      this.navegarLogon(returnUrl);
      return true;
    }
    if (this.jwtHelper.isTokenExpired()) {  //TODO #3 Colocar aqui uma validação do token no backend
      let toastApp = AppInjector.get(ToastAppService);
      toastApp.error('Faça login novamente.', "Acesso expirou", () => {
        this.utilStorage.limparDadosLocaisUsuario();
        this.navegarLogon(returnUrl);
      })
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
        if (!hasPermissao) {
          this.navegarAcessoNegado();
          return true;
        }
      }
    }

    return false;
  }


  private navegarLogon(returnUrl:string) {
    this.router.navigate(['/conta/login/'], { queryParams: { returnUrl: returnUrl } });
  }
  private navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado']);
  }

  protected verificarCadastroAgenciaCompleto() {

    const usuario = this.utilStorage.obterUsuario();
    if (usuario.tipoCadastro == TipoCadastroEnum.Agencia && usuario.agencia === null) {
      this.router.navigate(['/conta/cadastro-agencia']);

      return true;
    }

    return false;
  }

}

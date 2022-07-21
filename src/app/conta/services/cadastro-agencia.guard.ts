import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { IFormComponent } from 'src/app/app-core/interfaces/components/iform.component';
import { BaseGuard } from 'src/app/services/base.guard';
import { TipoCadastroEnum, Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class CadastroAgenciaGuard extends BaseGuard implements CanActivate, CanDeactivate<IFormComponent> {
  constructor(protected router: Router,
    protected jwtHelper: JwtHelperService) {
    super(router, jwtHelper);
  }

  override canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let encerrar = this.verificarAutenticacao(state.url);
    if (encerrar) return false;

    const usuario = this.utilStorage.obterUsuario();
    if (usuario.tipoCadastro == TipoCadastroEnum.Agente) {
      this.router.navigate(['/welcome']);
    } else if (usuario.tipoCadastro == TipoCadastroEnum.Agencia) {

      if (usuario.agencia === null)
        return true;
      if (usuario.agencia !== null)
        this.router.navigate(['/welcome']);
    }

    return false;
  }

}

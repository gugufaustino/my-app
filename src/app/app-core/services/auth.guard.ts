import { DateUtils } from './../utils/date-utils';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';

import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends BaseGuard implements CanActivate {
  constructor(protected router: Router,
              protected jwtHelper: JwtHelperService)
  {
    super(router, jwtHelper);
  }

  override canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let returnUrl: string = state.url;
    let encerrar = false;
    encerrar = this.verificarAutenticacao(returnUrl);
    if (encerrar) return false;

    encerrar = this.verificarCadastroAgenciaCompleto();
    if (encerrar) return false;

    return true;
  }

}

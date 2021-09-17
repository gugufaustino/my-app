import { Injectable } from '@angular/core';
import { BaseGuard } from 'src/app/services/base.guard';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';
import { InserirComponent } from '../inserir/inserir.component';

@Injectable()
export class ContasAPagarGuard extends BaseGuard implements CanActivate, CanDeactivate<InserirComponent>
{
  constructor(protected router: Router) { super(router); }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return super.validarClaim(routeAc);
  }

  canDeactivate(component: InserirComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
    }
    return true
  }


}

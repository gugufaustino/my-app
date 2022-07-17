import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from '@angular/router';
import { IFormComponent } from 'src/app/app-core/interfaces/components/iform.component';
import { BaseGuard } from 'src/app/services/base.guard';
import { TipoCadastroEnum, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ContaGuard extends BaseGuard implements CanActivate, CanDeactivate<IFormComponent> {
  constructor(protected router: Router) { super(router); }

  override canActivate(routeAc: ActivatedRouteSnapshot): boolean {

    if (!super.canActivate(routeAc))
      return false;


    debugger;
    let usuario = this.utilStorage.obterUsuario();

    if (usuario.tipoCadastro == TipoCadastroEnum.Agencia)
      return true;
    else if (usuario.tipoCadastro == TipoCadastroEnum.Agente)
      this.router.navigate(['/welcome']);

    return false;
  }

}

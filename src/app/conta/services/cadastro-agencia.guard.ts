import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from '@angular/router';
import { IFormComponent } from 'src/app/app-core/interfaces/components/iform.component';
import { BaseGuard } from 'src/app/services/base.guard';
import { TipoCadastroEnum, Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class CadastroAgenciaGuard extends BaseGuard implements CanActivate, CanDeactivate<IFormComponent> {
  constructor(protected router: Router) { super(router); }

  override canActivate(routeAc: ActivatedRouteSnapshot): boolean {

    let encerrar = this.verificarAutenticacao();
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

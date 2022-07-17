import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends BaseGuard implements CanActivate {
  constructor(protected router: Router) { super(router); }
  override canActivate()
  {
    let encerrar = false;

    encerrar = this.verificarAutenticacao();
    if(encerrar) return false;

    encerrar = this.verificarCadastroAgenciaCompleto();
    if (encerrar) return false;

    return true;
  }

}

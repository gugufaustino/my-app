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

    this.verificarAutenticacao();
    return true;
  }

}

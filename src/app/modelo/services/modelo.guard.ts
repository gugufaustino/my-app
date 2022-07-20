import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { IFormComponent } from 'src/app/app-core/interfaces/components/iform.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable({
  providedIn: 'root'
})
export class ModeloGuard extends BaseGuard implements CanActivate, CanDeactivate<IFormComponent> {

  constructor(protected router: Router,
    protected jwtHelper: JwtHelperService) {
    super(router, jwtHelper);
  }
}

import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { BaseGuard } from 'src/app/services/base.guard';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { IFormComponent } from 'src/app/app-core/interfaces/components/iform.component';

@Injectable()
export class ContasAPagarGuard extends BaseGuard implements CanActivate, CanDeactivate<IFormComponent>
{
  constructor(protected router: Router,
    protected jwtHelper: JwtHelperService) {
    super(router, jwtHelper);
  }

}

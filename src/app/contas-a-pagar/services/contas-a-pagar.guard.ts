import { Injectable } from '@angular/core';
import { BaseGuard } from 'src/app/services/base.guard';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ContasAPagarGuard extends BaseGuard implements CanActivate
//, CanDeactivate<unknown> 
{
  constructor(protected router: Router) { super(router); }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return super.validarClaim(routeAc);
  }

  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}

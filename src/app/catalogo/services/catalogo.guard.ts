import { Injectable } from '@angular/core';
import { BaseGuard } from 'src/app/services/base.guard';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { IFormComponent } from 'src/app/app-core/interfaces/components/iform.component';

@Injectable()
export class CatalogoGuard extends BaseGuard implements CanActivate, CanDeactivate<IFormComponent>
{
  constructor(protected router: Router) { super(router); }
}

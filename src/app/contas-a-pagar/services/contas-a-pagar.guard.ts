import { Injectable } from '@angular/core';
import { BaseGuard } from 'src/app/services/base.guard';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { InserirComponent } from '../inserir/inserir.component';

@Injectable()
export class ContasAPagarGuard extends BaseGuard implements CanActivate, CanDeactivate<InserirComponent>
{
  constructor(protected router: Router) { super(router); }

   

}
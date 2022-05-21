import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationBaseComponent } from 'src/app/app-core/components/navigation-base.component';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { NavegacaoService } from '../services/navegacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent extends NavigationBaseComponent {

  constructor() {
    super();
   }

}

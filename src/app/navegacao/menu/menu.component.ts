import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { NavegacaoService } from '../services/navegacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent   {

  localStorageUtil = new LocalStorageUtils();

  constructor() { }

  usuarioLogado(): boolean {
    return this.localStorageUtil.usuarioLogado();
  }

}

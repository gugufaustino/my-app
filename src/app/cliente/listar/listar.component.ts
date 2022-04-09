import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
})
export class ListarComponent implements OnInit {

  public models$: Observable<Cliente[]>;
  public componentRoute: string = '/cliente';

  constructor(
    private toastr: ToastAppService,
    private service: ClienteService<Cliente>
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.models$ = this.service.listarTodos()
    this.models$.subscribe(() => { },
      error => this.toastr.error(error))
  }

  excluir(model: Cliente): void {

    let mens: string[] = ['Excluído com sucesso!'];

    this.service.excluir(model.id)
      .subscribe(
        () => { this.toastr.success(mens); this.listar(); },
        error => this.toastr.error(error)
      );
  }

}

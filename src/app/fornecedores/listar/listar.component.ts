import { Component, OnInit } from '@angular/core';

import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { ToastAppService } from 'src/app/services/toastapp.service';

import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
})
export class ListarComponent implements OnInit {

  public lstModels: Fornecedor[];
  public storage = new LocalStorageUtils();
  public componentRoute : string  = '/fornecedores';

  constructor(
    private toastr: ToastAppService,
    private service: FornecedorService<Fornecedor>
    ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listarTodos()
      .subscribe(
        data => this.lstModels = data,
        falha => this.toastr.error(falha)
      )
  }

  excluir(model: Fornecedor): void {

    let mens: string[] = ['Excluído com sucesso!'];

    this.service.excluir(model.id)
      .subscribe(
        () => { this.toastr.success(mens); this.listar(); },
        error => this.toastr.error(error)
      );
  }

}

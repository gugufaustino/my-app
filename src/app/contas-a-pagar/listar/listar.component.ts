import { Component, OnInit } from '@angular/core';

import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { ToastAppService } from 'src/app/services/toastapp.service';

import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { Pagamento } from '../models/pagamento';

@Component({
  selector: 'app-lista',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public contasPagamento: Pagamento[];
  public localStorageUtils = new LocalStorageUtils();

  constructor(private contasAPagarService: ContasAPagarService<Pagamento>,
    private toastr: ToastAppService) { }

  ngOnInit(): void {
    this.listarTodos();

  }

  listarTodos(): void {
    this.contasAPagarService.listarTodos()
      .subscribe(
        contasPagamento => this.contasPagamento = contasPagamento,
        falha => this.toastr.error(falha)
      )
  }

  onChangePago(event: Event, idPagamento: number) {
    var input: HTMLInputElement = (event.target as HTMLInputElement);

    this.contasAPagarService.editarPago(idPagamento, input.checked)
      .subscribe(
        () => { this.toastr.success([], 'Sucesso!') },
        (error) => {
          input.checked = !input.checked;
          this.toastr.error(error, 'Erro');
        }
      )
  }

  excluir(pagamento: Pagamento): void {


    let mens: string[] = ['Excluído com sucesso!'];

    this.contasAPagarService.excluir(pagamento.id)
      .subscribe(
        () => { this.toastr.success(mens); this.listarTodos(); },
        error => this.toastr.error(error)
      );
  }



}

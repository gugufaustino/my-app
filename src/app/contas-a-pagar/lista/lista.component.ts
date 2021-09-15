import { Component, OnInit } from '@angular/core';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Pagamento } from '../models/pagamento';
import { ContasAPagarService } from '../services/contas-a-pagar.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public contasPagamento: Pagamento[];
  public localStorageUtils = new LocalStorageUtils();

  constructor(private contasAPagarService: ContasAPagarService,
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

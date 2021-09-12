import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { isThisTypeNode } from 'typescript';
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
        () => { this.toastr.success('Salvo com sucesso!') },
        (error) => {
          input.checked = !input.checked;
          this.toastr.error(error, 'Erro');
        }
      )
  }

  excluir(pagamento: Pagamento): void {
    
    this.contasAPagarService.excluir(pagamento.id)
      .subscribe(
        () => { this.toastr.success('Excluído com sucesso!'); this.listarTodos(); },
        error => this.toastr.error(error)
      );
  }



}

import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private contasAPagarService: ContasAPagarService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  listarTodos(): void {
    this.contasAPagarService.listarTodos()
      .subscribe(
        contasPagamento => this.contasPagamento = contasPagamento,
        falha => this.toastr.error('Ocorreu um erro!')
      )
  }
 
  onChangePago(event: Event, idPagamento: number) {
    var input: HTMLInputElement = (event.target as HTMLInputElement);

    this.contasAPagarService.editarPago(idPagamento, input.checked)
      .subscribe(
        () => { this.toastr.success('Salvo com sucesso!') },
        (falha) => {
          input.checked = !input.checked;

          if (falha?.error?.errors != null) //TODO ver uma melhor abordagem nos tratamento de erros em requests, 403, 401 e RNs
            this.toastr.error(falha.error.errors.join(),'Erro');
        }
      )
  }
  
  excluir(contaPagamento: Pagamento): void {

    this.contasAPagarService.excluir(contaPagamento.id)
      .subscribe(
        () => { this.toastr.success('Excluído com sucesso!'); this.listarTodos() },
        (falha) => {
          if (falha?.error?.errors != null)
            this.toastr.error(falha.error.errors.join(),'Erro')
        }
      )
  }



}

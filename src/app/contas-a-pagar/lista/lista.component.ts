import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  excluir(contaPagamento : Pagamento):void {
    
      this.contasAPagarService.excluir(contaPagamento.id)
      .subscribe( 
        result => { this.listarTodos()},
        (falha) => { this.toastr.error(falha.error.errors.join(), "Erro") }    
       )
      
  }

  listarTodos():void {
    this.contasAPagarService.listarTodos()
    .subscribe(
      contasPagamento =>  this.contasPagamento = contasPagamento ,
      falha =>  this.toastr.error(falha.error.errors.join(), "Erro")
    )
  }

}

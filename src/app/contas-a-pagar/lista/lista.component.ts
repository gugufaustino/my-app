import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContaPagamento } from '../models/contapagamento';
import { ContasAPagarService } from '../services/contas-a-pagar.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public contasPagamento: ContaPagamento[];

  constructor(private contasAPagarService: ContasAPagarService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contasAPagarService.listarTodos()
      .subscribe(
        contasPagamento =>  this.contasPagamento = contasPagamento ,
        falha =>  this.toastr.error(falha.error.errors.join(), "Erro")
      )
  }

}

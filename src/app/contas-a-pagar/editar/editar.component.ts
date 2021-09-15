import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CustomValidators } from 'ng2-validation';

import { Pagamento } from '../models/pagamento';
import { ContasPagarBase } from '../contas-a-pagar-form.base.component';

import { NgBrazilValidators } from 'ng-brazil';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { DateUtils } from 'src/app/utils/date-utils';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { titulo } from 'ng-brazil/titulo/validator';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ContasPagarBase implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pagamento: Pagamento;
  //pagamentoForm!: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private contasAPagarService: ContasAPagarService) {
    super();
    this.pagamento = this.route.snapshot.data["pagamento"];

  }

  ngOnInit(): void {
    this.pagamentoForm = this.fb.group({
      descricaoFornecedor: ['', [Validators.required]],
      valor: ['', [Validators.required, NgBrazilValidators.currency]],
      dtVencimento: ['', [Validators.required]],
    });


    this.pagamentoForm.patchValue({
      descricaoFornecedor: this.pagamento.descricaoFornecedor,
      valor: CurrencyUtils.DecimalParaString(this.pagamento.valor),
      dtVencimento: DateUtils.Format(this.pagamento.dtVencimento),
    });
  }

  submitForm() {

    if (this.pagamentoForm.dirty && this.pagamentoForm.valid) {

      this.pagamento = super.mapToModel(this.pagamento, this.pagamentoForm.value)

      this.contasAPagarService.editar(this.pagamento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha =>  this.toastr.error(falha)
        );
    }
  }

  processarSucesso(response: any) {
    //this.pagamentoForm.reset();
    this.errors = [];
    
    let toast = this.toastr.success(response.message, "", () => {
      this.pagamentoForm.reset();
      this.router.navigate(['/contas-a-pagar/lista']);
    });

  }

  
}

import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { fromEvent, merge, Observable } from 'rxjs';

import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { Pagamento } from '../models/pagamento';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { DateUtils } from 'src/app/utils/date-utils';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html'
})
export class DetalheComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    contaPagamento: Pagamento;
    pagamentoForm!: FormGroup  ;

    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;

    errors: any = []; 


  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private contasAPagarService: ContasAPagarService) {

              this.contaPagamento = this.route.snapshot.data["contaPgamento"];

  }

  ngOnInit(): void {

    this.pagamentoForm = this.fb.group({
        descricaoFornecedor: ['', [Validators.required]],
        valor: ['', [Validators.required]],
        dtVencimento: ['', [Validators.required]],
    });
    

    this.pagamentoForm.patchValue({
      descricaoFornecedor: this.contaPagamento.descricaoFornecedor,
      valor: CurrencyUtils.DecimalParaString(this.contaPagamento.valor),
      dtVencimento: DateUtils.Format(this.contaPagamento.dtVencimento),       
    });
  }

  submitForm() {

    if (this.pagamentoForm.dirty && this.pagamentoForm.valid) {
      
      this.contaPagamento = Object.assign({}, this.contaPagamento, this.pagamentoForm.value)
      this.contaPagamento.dtVencimento = DateUtils.StringParaDate(this.contaPagamento.dtVencimento.toString());
      this.contaPagamento.valor = CurrencyUtils.StringParaDecimal(this.contaPagamento.valor);
      
      console.log(JSON.stringify(this.contaPagamento))
      
      this.contasAPagarService.salvarConta(this.contaPagamento)
        .subscribe(
          sucesso => {  this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.pagamentoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Salvo com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contas-a-pagar/lista']);        
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

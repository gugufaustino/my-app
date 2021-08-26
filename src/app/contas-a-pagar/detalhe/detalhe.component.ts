import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { fromEvent, merge, Observable } from 'rxjs';

import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { ContaPagamento } from '../models/contapagamento';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html'
})
export class DetalheComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    contaPgamento: ContaPagamento;
    pagamentoForm!: FormGroup  ;

    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;


  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {

                this.contaPgamento = this.route.snapshot.data["contaPgamento"];

  }

  ngOnInit(): void {

    this.pagamentoForm = this.fb.group({
        descricaoFornecedor: ['', [Validators.required]],
        valor: ['', [Validators.required]],
        dtVencimento: ['', [Validators.required]],
    });
    

    this.pagamentoForm.patchValue({
      descricaoFornecedor: this.contaPgamento.descricaoFornecedor,
      valor: CurrencyUtils.DecimalParaString(this.contaPgamento.valor),
      dtVencimento: DateUtils.Format(this.contaPgamento.dtVencimento),       
    });
  }

  submitForm() {

  }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, AbstractControl, FormControlName, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CustomValidators } from 'ng2-validation';
import { FormBaseComponent } from 'src/app/base-components/form-base.components';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { Pagamento } from '../models/pagamento';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { DateUtils } from 'src/app/utils/date-utils';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contasAPagarService: ContasAPagarService) {
    super();

  }


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pagamento: Pagamento = new Pagamento();

  pagamentoForm: FormGroup;

  MASKS: any = MASKS;
  DateMask = DateUtils.DataMask;
  DataDayMask = DateUtils.DataDayMask;

  errors: any = [];

  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;


  ngOnInit(): void {
    this.pagamentoForm = this.fb.group({
      descricaoFornecedor: ['', [Validators.required]],
      tipoRecorrencia: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      dtVencimento: ['', [Validators.required]],
      diaVencimento: ['', [Validators.required]],
    });

    this.pagamentoForm.patchValue({ tipoRecorrencia: '1', ativo: true });
  }

  tipoRecorrencia(): FormControl | any {
    return this.pagamentoForm.get('tipoRecorrencia');
  }
  diaVencimento(): FormControl | any {
    return this.pagamentoForm.get('diaVencimento');
  }

  dtVencimento(): AbstractControl | any {
    return this.pagamentoForm.get('dtVencimento');
  }

  ngAfterViewInit(): void {
    this.tipoRecorrencia().valueChanges.subscribe(() => {
      this.tipoRecorrenciaValueChanges();
    });

  }

  tipoRecorrenciaValueChanges() {
    if (this.tipoRecorrencia().value === "1") {
      this.diaVencimento().clearValidators();
      this.dtVencimento().clearValidators();

    }
    else {
      this.dtVencimento().clearValidators()
      this.diaVencimento().clearValidators()
    }
  }

  submitForm(): void {
    if (this.pagamentoForm.dirty && this.pagamentoForm.valid) {

      this.pagamento = super.mapToModel(this.pagamento, this.pagamentoForm.value )
      // this.pagamento = Object.assign({}, this.pagamento, this.pagamentoForm.value)
      // this.pagamento.dtVencimento = DateUtils.StringParaDate(this.pagamento.dtVencimento.toString());
      // this.pagamento.valor = CurrencyUtils.StringParaDecimal(this.pagamento.valor);
      // this.pagamento.tipoRecorrencia = parseInt(this.pagamento.tipoRecorrencia.toString());

      this.contasAPagarService.inserir(this.pagamento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
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
    this.toastr.error('Ocorreu um erro!', 'Opa :( ');
  }

}

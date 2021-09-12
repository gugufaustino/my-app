import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, AbstractControl, FormControlName, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { Pagamento } from '../models/pagamento';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ContasPagarBase } from '../contas-a-pagar-form.base.component';
import { ToastAppService } from 'src/app/services/toastapp.service';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ContasPagarBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private contasAPagarService: ContasAPagarService) {
    super();
  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pagamento: Pagamento = new Pagamento();

  ngOnInit(): void {

    this.pagamentoForm = this.fb.group(this.controlsFormBase); // obrigatário uso de this aqui nesso ponto    
    this.pagamentoForm.addControl('new', new FormControl('dtVencimento', super.dtVencValidators));

    // Valores Default
    this.pagamentoForm.patchValue({ tipoRecorrencia: '1', ativo: true });
  }

  ngAfterViewInit(): void {

    this.tipoRecorrencia().valueChanges.subscribe(() => {
      this.tipoRecorrenciaValueChanges();
      //super.validarFormulario(this.pagamentoForm);
    });
  }

  tipoRecorrencia(): FormControl | any {
    return this.pagamentoForm.get('tipoRecorrencia');
  }
  dtVencimento(): AbstractControl | any {
    return this.pagamentoForm.get('dtVencimento');
  }

  diaVencimento(): AbstractControl | any {
    return this.pagamentoForm.get('diaVencimento');
  }

  tipoRecorrenciaValueChanges() {

    this.dtVencimento().clearValidators();
    this.diaVencimento()?.clearValidators();

    if (this.tipoRecorrencia().value === "1") {
      //Data
      this.dtVencimento()?.setValidators(super.dtVencValidators);
    }
    else {
      //Dia
      if (this.diaVencimento() == null) {
        this.pagamentoForm.addControl('new', new FormControl('diaVencimento', super.diaVencValidators));
      }
      this.diaVencimento()?.setValidators(super.diaVencValidators);

    }
  }

  submitForm(): void {
    if (this.pagamentoForm.dirty && this.pagamentoForm.valid) {

      this.pagamento = super.mapToModel(this.pagamento, this.pagamentoForm.value)
      // this.pagamento = Object.assign({}, this.pagamento, this.pagamentoForm.value)
      // this.pagamento.dtVencimento = DateUtils.StringParaDate(this.pagamento.dtVencimento.toString());
      // this.pagamento.valor = CurrencyUtils.StringParaDecimal(this.pagamento.valor);
      // this.pagamento.tipoRecorrencia = parseInt(this.pagamento.tipoRecorrencia.toString());

      this.contasAPagarService.inserir(this.pagamento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha =>  this.toastr.error(falha)
        );
    }
  }

  processarSucesso(response: any) {
    this.pagamentoForm.reset();
    this.errors = [];

    this.toastr.success('Salvo com sucesso!', 'Sucesso!', () => {
      this.router.navigate(['/contas-a-pagar/lista']);
    }); 
  } 

}

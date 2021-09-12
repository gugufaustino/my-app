import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, AbstractControl, FormControlName, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

import { Pagamento } from '../models/pagamento';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ToastrService } from 'ngx-toastr';
import { ContasPagarBase } from '../contas-a-pagar-form.base.component';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ContasPagarBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
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
    if (this.tipoRecorrencia().value === "1") {
      //Dia
      this.diaVencimento()?.clearValidators();
      //Data
      this.dtVencimento()?.setValidators(super.dtVencValidators);

    }
    else {

      //Dia
      if (this.diaVencimento() == null) {
        this.pagamentoForm.addControl('new', new FormControl('diaVencimento', super.diaVencValidators));
      }
      this.diaVencimento()?.setValidators(super.diaVencValidators);

      //Data
      this.dtVencimento().clearValidators();

      
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

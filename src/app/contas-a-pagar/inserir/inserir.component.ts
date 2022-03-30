import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, AbstractControl, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Pagamento } from '../models/pagamento';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ContasPagarBase } from '../contas-a-pagar-form.base.component';
import { ToastAppService } from 'src/app/services/toastapp.service';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html'
})
export class InserirComponent extends ContasPagarBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private contasAPagarService: ContasAPagarService<Pagamento>) {
    super();
  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pagamento: Pagamento = new Pagamento();

  ngOnInit(): void {

    this.pagamentoForm = this.fb.group(this.controlsFormBase); // obrigatário uso de this aqui nesso ponto

    this.pagamentoForm.addControl('dtVencimento', new FormControl('', this.dtVencValidators));
    this.pagamentoForm.addControl('diaVencimento', new FormControl(''));
    //this.pagamentoForm.get('dtVencimento')?.setValidators(this.dtVencValidators);

    // Valores Default
    this.pagamentoForm.patchValue({ tipoRecorrencia: '1' });
    this.tipoRecorrenciaValueChanges();
  }

  ngAfterViewInit(): void {

    this.tipoRecorrencia().valueChanges
      .subscribe(() => {
        this.tipoRecorrenciaValueChanges();
        //super.validarFormulario(this.pagamentoForm);
      });


    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.pagamentoForm);
  }


  dtVencimento(): AbstractControl | any {
    return this.pagamentoForm.get('dtVencimento');
  }

  diaVencimento(): AbstractControl | any {
    return this.pagamentoForm.get('diaVencimento');
  }

  tipoRecorrenciaValueChanges() {

    this.desabilitaCampo(this.pagamentoForm, 'dtVencimento');
    this.desabilitaCampo(this.pagamentoForm, 'diaVencimento');

    if (this.tipoRecorrencia().value === "1") { //Data Obrigatório
      this.dtVencimento().setValidators(this.dtVencValidators);
      this.dtVencimento().enable();
    }
    else if (this.tipoRecorrencia().value === "2") {// Dia Obrigatório
      this.diaVencimento()?.setValidators(this.diaVencValidators);
      this.diaVencimento()?.enable();
    }
  }

  formResult: string = '';

  submitForm(): void {

    super.validarFormulario(this.pagamentoForm, true);

    if (this.pagamentoForm.dirty && this.pagamentoForm.valid) {
      this.pagamento = super.mapToModel(this.pagamento, this.pagamentoForm.value)
      this.formResult = JSON.stringify(this.pagamento);


      this.contasAPagarService.inserir(this.pagamento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => this.toastr.error(falha)
        );
    }
  }

  processarSucesso(response: any) {
    //this.pagamentoForm.reset();
    this.errors = [];
    this.mudancasNaoSalvas = false;

    this.toastr.success(response.message, 'Sucesso!', () => {
      this.pagamentoForm.reset();
      this.router.navigate(['/contas-a-pagar/listar']);
    });
  }

}

import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Pagamento } from '../models/pagamento';
import { ContasPagarBase } from '../contas-a-pagar-form.base.component';

import { CurrencyUtils } from 'src/app/app-core/utils/currency-utils';
import { DateUtils } from 'src/app/app-core/utils/date-utils';
import { ContasAPagarService } from '../services/contas-a-pagar.service';
import { ToastAppService } from 'src/app/services/toastapp.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ContasPagarBase implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pagamento: Pagamento = new Pagamento();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private contasAPagarService: ContasAPagarService<Pagamento>) {
    super();
    this.pagamento = Object.assign(this.pagamento, this.route.snapshot.data["pagamento"]);
  }

  ngOnInit(): void {

    this.pagamentoForm = this.fb.group(this.controlsFormBase); // obrigatório uso de this aqui nesso ponto
    this.pagamentoForm.addControl('dtVencimento', new FormControl('', this.dtVencValidators));

    this.pagamentoForm.patchValue({
      descricaoFornecedor: this.pagamento.descricaoFornecedor,
      valor: CurrencyUtils.DecimalParaString(this.pagamento.valor),
      tipoRecorrencia: this.pagamento.tipoRecorrencia.toString(),
      dtVencimento: DateUtils.Format(this.pagamento.dtVencimento)
    });

      this.pagamentoForm.get('tipoRecorrencia')?.disable();
  }

  ngAfterViewInit(): void {

    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.pagamentoForm);
  }

  submitForm() {
    super.validarFormulario(this.pagamentoForm, true);
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
    this.errors = [];
    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success(response.message, "Sucesso!", () => {
      this.pagamentoForm.reset();
      this.router.navigate(['/contas-a-pagar/listar']);
    });

  }


}

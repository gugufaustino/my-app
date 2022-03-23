import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastAppService } from 'src/app/services/toastapp.service';
import { FornecedorBase } from '../fornecedor-base.component';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
})
export class EditarComponent extends FornecedorBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private service: FornecedorService<Fornecedor>) {
    super();
    this.model = Object.assign(this.model, this.route.snapshot.data["model"]);
  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  model: Fornecedor = new Fornecedor();

  ngOnInit(): void {

    this.componentForm = this.fb.group(this.controlsFormBase);

    // Valores Default
    this.componentForm.patchValue({
      razaoSocial: this.model.razaoSocial,
      cnpj: this.model.cnpj,
      atividade: this.model.atividade,
      cep: this.model.cep,
      logradouro: this.model.logradouro,
      numero: this.model.numero,
      complemento: this.model.complemento,
      bairro: this.model.bairro,
      nomeMunicipio: this.model.nomeMunicipio ,
      siglaUf: this.model.siglaUf,
    });
  }

  ngAfterViewInit(): void {

    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm)
  }

  submitForm(): void {

    super.validarFormulario(this.componentForm, true);

    if (this.componentForm.dirty && this.componentForm.valid) {
      this.model = super.mapToModel(this.model, this.componentForm.value)

      this.service.editar(this.model)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => this.toastr.error(falha)
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];
    this.mudancasNaoSalvas = false;

    this.toastr.success(response.message, 'Sucesso!', () => {
      this.componentForm.reset();
      this.router.navigate(['/fornecedores/listar']);
    });
  }

}

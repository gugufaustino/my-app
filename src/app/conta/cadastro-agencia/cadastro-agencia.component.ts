import { LocalStorageUtils } from 'src/app/app-core/utils/localstorage';
import { UserToken } from './../../app-core/models/user-token';
import { Component, ElementRef, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/app-core/components/form-base.component';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/app-core/utils/generic-form-validation';
import { Conta } from '../models/conta';
import { ContaService } from '../services/conta.service';
import { Agencia } from '../models/agencia';

@Component({
  selector: 'app-cadastro-agencia',
  templateUrl: './cadastro-agencia.component.html',
  styleUrls: ['../cadastro/cadastro.component.css']
})
export class CadastroAgenciaComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  user: UserToken
  cadastroForm!: FormGroup;
  agencia: Agencia;
  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private router: Router) {
    super();
    this.user = new LocalStorageUtils().obterUsuario();
    this.validationMessages = { }
    this.genericValidatior = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]],
      nomeFantasia: ['', Validators.required],
      instagram: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  }
  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase(this.validationMessages);
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }


  registrar() {
    super.validarFormulario(this.cadastroForm, true);
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.agencia = Object.assign({}, this.agencia, this.cadastroForm.value)
      this.contaService.registraAgencia(this.agencia)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  private processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];
    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toastSucesso = this.toastr.success("cadastro realizado com sucesso.", "Bem vindo!");
    if (toastSucesso) {
      toastSucesso.onHidden.subscribe(() => {
        this.router.navigate(['/conta/cadastro-agencia']);
      });
    }
  }

  private processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error("verifique os motivos na lista de erros.", "Erro ao registrar-se.");
  }

}

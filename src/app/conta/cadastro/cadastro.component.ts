import { ValidationMessages } from './../../app-core/utils/generic-form-validation';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator } from '../../app-core/utils/generic-form-validation';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/app-core/components/form-base.component';
import { OptionSelect } from 'src/app/app-core/models/option-select';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario
  cadastroForm!: FormGroup;
  formResult: string = '';
  errors: any = [];

  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private router: Router ) {
      super();

    this.validationMessages = {
      nome: {
        minlength: 'Tamanho minimo inválido',
        maxlength: 'Tamanho máximo inválido'
      },
      cpf: {
        cpf: 'formato inválido',
      },
      email: {
        email: 'formato inválido',
      },
      password: {
        rangeLength: 'Tamanho deve ser entre 6 e 15 caracteres',
      },
      confirmPassword: {
        rangeLength: 'Tamanho deve ser entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      },
      tipoCadastro: {
        required : 'selecione uma das opções'
      }
    }

    this.genericValidatior = new GenericValidator(this.validationMessages);


  }

  ngOnInit(): void {

    let senhaFg = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaconfirmFg = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senhaFg)]);

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],

      password: senhaFg,
      confirmPassword: senhaconfirmFg,

      tipoCadastro: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase(this.validationMessages);
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);

  }

  adicionarUsuario() {

    super.validarFormulario(this.cadastroForm, true);
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
      this.contaService.registraUsuario(this.usuario)
        .subscribe(
          sucesso => {  this.processarSucesso(sucesso) },
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

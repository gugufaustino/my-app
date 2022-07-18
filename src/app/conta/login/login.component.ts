import { Component, ElementRef, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

import { Conta } from '../models/conta';
import { ContaService } from '../services/conta.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBaseComponent } from 'src/app/app-core/components/form-base.component';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  controlsFormBase: any;
  componentForm: FormGroup;
  login: Login
  formResult: string = '';
  returnUrl: string;
  passwordType: boolean = true;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastAppService,
    private router: Router,
    private route: ActivatedRoute) {
    super()

    this.controlsFormBase = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    };

    this.validationMessages = {
      password: {
        rangeLength: 'Tamanho deve ser entre 6 e 15 caracteres',
      },
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

  }

  ngOnInit(): void {
    this.componentForm = this.fb.group(this.controlsFormBase);
  }

  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase(this.validationMessages);
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm);
    super.configurarBase()
  }

  submitForm() {
    super.validarFormulario(this.componentForm, true);
    if (this.componentForm.dirty && this.componentForm.valid) {
      this.login = Object.assign({}, this.login, this.componentForm.value)

      this.contaService.login(this.login)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  private processarSucesso(response: any) {
    this.componentForm.reset();
    this.errors = [];


    this.toastr.success(["Login realizado com sucesso"], "Bem vindo!", () => {
      this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(['/welcome']);
        this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);
    });
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(fail.error.errors.join(), "Erro");
  }


  togglePasswordType(){
    this.passwordType = !this.passwordType;
  }

}


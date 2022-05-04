import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';

import { FormBaseComponent } from 'src/app/app-core/components/form-base.component';
import { ToastAppService } from 'src/app/services/toastapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  controlsFormBase: any;
  componentForm: FormGroup;
  usuario: Usuario
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastAppService,
    private router: Router) {
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


  }

  ngOnInit(): void {
    this.componentForm = this.fb.group(this.controlsFormBase);
  }

  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase(this.validationMessages);
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm)
  }

  submitForm() {
    super.validarFormulario(this.componentForm, true);
    if (this.componentForm.dirty && this.componentForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.componentForm.value)

      this.contaService.login(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  private processarSucesso(response: any) {
    this.componentForm.reset();
    this.errors = [];
    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    this.toastr.success(["Login realizado com sucesso"], "Bem vindo!", () => {
      this.router.navigate(['/welcome'])
    });
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(fail.error.errors.join(), "Erro");
  }

}


import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import * as ngBrazil from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';

import { FormBaseComponent } from 'src/app/base-components/form-base.components';

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
    private toastr: ToastrService,
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

    let toastSucesso = this.toastr.success("Login realizado com sucesso", "Bem vindo!");
    if (toastSucesso) {
      toastSucesso.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }


  }
  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(fail.error.errors.join(), "Erro");
  }

}


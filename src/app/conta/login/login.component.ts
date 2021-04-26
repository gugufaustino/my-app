import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loginForm!: FormGroup;
  usuario: Usuario
  formResult: string = '';
  MASKS: any = MASKS;
  errors: any = [];

  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private router: Router) {
    this.validationMessages = {
      email: {
        required: 'Requerido',
        email: 'formato inválido',
      },
      password: {
        required: 'Requerido',
        rangeLength: 'Tamanho deve ser entre 6 e 15 caracteres',
      },
    }

    this.genericValidatior = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formContro: ElementRef) => fromEvent(formContro.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidatior.processaMensgens(this.loginForm);
    });

  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value)
      
      this.contaService.login(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  private processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];
    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toastSucesso = this.toastr.success("Login realizado com sucesso", "Bem vindo!");
    if (toastSucesso) {
      toastSucesso.onHidden.subscribe(() => {
        this.router.navigate(['/contas-a-pagar/lista']);
      });
    }


  }
  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(fail.error.errors.join(), "Erro");
  }

}


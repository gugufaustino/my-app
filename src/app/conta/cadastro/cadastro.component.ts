import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../app-core/utils/generic-form-validation';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario
  cadastroForm!: FormGroup;
  formResult: string = '';
  MASKS: any = MASKS;

  errors: any = [];

  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private router: Router ) {
    this.validationMessages = {
      nome: {
        required: 'Requerido',
        minlength: 'Tamanho minimo inválido',
        maxlength: 'Tamanho máximo inválido'
      },
      cpf: {
        required: 'Requerido',
        cpf: 'formato inválido',
      },
      email: {
        required: 'Requerido',
        email: 'formato inválido',
      },
      password: {
        required: 'Requerido',
        rangeLength: 'Tamanho deve ser entre 6 e 15 caracteres',
      },
      confirmPassword: {
        required: 'Requerido',
        rangeLength: 'Tamanho deve ser entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }

    this.genericValidatior = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let senhaFg = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    //let senhaconfirmFg = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senhaFg)]);

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      password: senhaFg,
      confirmPassword: ['', Validators.required],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [NgBrazilValidators.telefone]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formContro: ElementRef) => fromEvent(formContro.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidatior.processaMensgens(this.cadastroForm);
    });

  }

  adicionarUsuario() {
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
          this.router.navigate(['/home']);
      });
    }
  }

  private processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(fail.error.errors.join(), "Erro");
  }

}

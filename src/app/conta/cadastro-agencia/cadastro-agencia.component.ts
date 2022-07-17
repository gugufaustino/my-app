import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/app-core/components/form-base.component';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/app-core/utils/generic-form-validation';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-cadastro-agencia',
  templateUrl: './cadastro-agencia.component.html',
  styleUrls: ['./cadastro-agencia.component.css']
})
export class CadastroAgenciaComponent  extends FormBaseComponent  implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario
  cadastroForm!: FormGroup;

  validationMessages: ValidationMessages;
  genericValidatior: GenericValidator;
  displayMessage: DisplayMessage;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private router: Router ) {
      super();

    this.validationMessages = {

      tipoCadastro: {
        required : 'selecione uma das opções'
      }
    }

    this.genericValidatior = new GenericValidator(this.validationMessages);


  }

  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]],
      tipoCadastro: [null, Validators.required],
    });

  }

}

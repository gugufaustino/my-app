import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';

import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {

  usuario: Usuario
  cadastroForm!: FormGroup;
  formResult: string = '';
  MASKS = MASKS;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  
    let senhaFg = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let senhaconfirmFg = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senhaFg)]);

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['', [NgBrazilValidators.telefone]],
      password: senhaFg,
      confirmPassword: senhaconfirmFg
    });
  }

  adicionarUsuario() {
   

    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } else {
      this.formResult = "Inv"
    }

  }

}

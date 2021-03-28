import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

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

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['', [NgBrazilValidators.telefone]],
      password: [''],
      confirmPassword: ['']
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

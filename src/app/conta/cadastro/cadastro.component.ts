import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;  
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
        nome: ['', Validators.required],
        cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
        email: ['', ],
        password: [''],
        confirmPassword: ['']
    });
  }

  adicionarUsuario(){
     let x = this.cadastroForm.value;
  }
  
}

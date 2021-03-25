import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;  
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
        nome: [''],
        email: [''],
        password: [''],
        confirmPassword: ['']
    });
  }

  adicionarUsuario(){
     let x = this.cadastroForm.value;
  }
  
}

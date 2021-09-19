import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastAppService } from 'src/app/services/toastapp.service';
import { ClienteBase } from '../cliente-form.base.component';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';




@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
})

export class InserirComponent extends ClienteBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private service: ClienteService<Cliente>) {
    super();
  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  model: Cliente = new Cliente();

  ngOnInit(): void {

    this.componentForm = this.fb.group(this.controlsFormBase); 

    // Valores Default
    this.componentForm.patchValue({  });
  }

  ngAfterViewInit(): void {
 

    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm)
  }
 
  submitForm(): void {

    super.validarFormulario(this.componentForm, true);

    if (this.componentForm.dirty && this.componentForm.valid) {
      this.model = super.mapToModel(this.model, this.componentForm.value)

      this.service.inserir(this.model)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => this.toastr.error(falha)
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];
    this.mudancasNaoSalvas = false;
     
    this.toastr.success(response.message, 'Sucesso!', () => {

      this.componentForm.reset();
      this.router.navigate(['/cliente/listar']);
    });
  }

}

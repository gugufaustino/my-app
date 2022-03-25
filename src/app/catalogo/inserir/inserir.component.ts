import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastAppService } from 'src/app/services/toastapp.service';
import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
})
export class InserirComponent extends CatalogoBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private toastr: ToastAppService,) {
    super();
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  model: Modelo = new Modelo();

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

    console.log(this.componentForm.controls.dtNascimento)

    super.validarFormulario(this.componentForm, true);

    if (this.componentForm.dirty && this.componentForm.valid) {
      this.model = super.mapToModel(this.model, this.componentForm.value)

      // this.service.inserir(this.model)
      //   .subscribe(
      //     sucesso => { this.processarSucesso(sucesso) },
      //     falha => this.toastr.error(falha)
      //   );
    }
  }

}

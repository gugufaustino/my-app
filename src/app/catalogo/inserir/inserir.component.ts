import { CatalogoService } from './../services/catalogo.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';

import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
})
export class InserirComponent extends CatalogoBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private service: CatalogoService<Modelo>) {
    super(fb);
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  ngOnInit(): void {

    this.componentForm = this.fb.group(this.controlsFormBase);

  }

  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm);

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
      this.router.navigate(['/catalogo']);
    });
  }





}

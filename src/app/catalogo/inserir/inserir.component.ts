import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControlName } from '@angular/forms';
import { DropdownService } from 'src/app/app-core/services/dropdown.service';

import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
})
export class InserirComponent extends CatalogoBase implements OnInit, AfterViewInit {

  constructor(
    private fb: FormBuilder) {
    super(fb);
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  ngOnInit(): void {

    this.componentForm = this.fb.group(this.controlsFormBase);

  }

  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm)
  }


  submitForm(): void {

    console.log(this.componentForm.controls)

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



  getTipoCastingControls() {
    return this.componentForm.get('tipoCasting') ? (<FormArray>this.componentForm.get('tipoCasting')).controls : null;
  }

}

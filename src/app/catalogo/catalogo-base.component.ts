import { ElementRef } from "@angular/core";

import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { CustomValidators } from "ng2-validation";

import { FormBaseComponent } from "../app-core/components/form-base.component";
import { DropdownService } from "../app-core/services/dropdown.service";
import { DateUtils } from "../app-core/utils/date-utils";
import { FormValidations } from "../app-core/utils/form-validations";

export abstract class CatalogoBase extends FormBaseComponent {

  MASKS: any = MASKS;
  DateMask = DateUtils.DataMask;
  DataDayMask = DateUtils.DataDayMask;

  componentForm: FormGroup;
  controlsFormBase: any;
  tipoCasting: any[];

  constructor(
    protected formBuilder: FormBuilder,
    protected dropdownService: DropdownService) {
    super();

    this.tipoCasting = dropdownService.getTipoCasting();

    this.controlsFormBase = {
      nome: ['', [Validators.required, CustomValidators.rangeLength([3, 250])]],
      dtNascimento: ['', [Validators.required, FormValidations.data]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],

      diponibilidade: ['', [Validators.required]],
      tipoCasting: this.buildFrameworks(),

      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],

      instagram: ['', [Validators.required]],
      facebook: [''],

      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      logradouro: ['', [Validators.required, Validators.maxLength(250)]],
      numero: ['', [Validators.required, CustomValidators.number]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      siglaUf: ['', [Validators.required]],
      nomeMunicipio: ['', [Validators.required]],

    };

    this.validationMessages = {
    }
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.componentForm);
  }

  protected configurarMensagensValidacaoBase() {
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  buildFrameworks() {

    const values = this.tipoCasting.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

  }
}

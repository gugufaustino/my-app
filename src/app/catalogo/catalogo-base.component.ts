import { ElementRef } from "@angular/core";

import { FormGroup, PatternValidator, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators, NgBrDirectives } from "ng-brazil";
import { CustomValidators } from "ng2-validation";

import { FormBaseComponent } from "../base-components/form-base.components";
import { DateUtils } from "../utils/date-utils";
import { FormValidations } from "../utils/form-validations";

export abstract class CatalogoBase extends FormBaseComponent {

  MASKS: any = MASKS;
  DateMask = DateUtils.DataMask;
  DataDayMask = DateUtils.DataDayMask;

  componentForm: FormGroup;
  controlsFormBase: any;


  constructor() {
    super();

    this.controlsFormBase = {
      nome: ['', [Validators.required, CustomValidators.rangeLength([3, 250])]],
      dtNascimento: ['', [Validators.required, FormValidations.data]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],

      diponibilidade: ['', [Validators.required]],
      tipoCasting: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],

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
}

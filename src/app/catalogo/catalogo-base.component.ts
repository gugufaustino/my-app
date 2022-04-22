import { ElementRef } from "@angular/core";

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { CustomValidators } from "ng2-validation";

import { FormBaseComponent } from "../app-core/components/form-base.component";
import { OptionSelect } from "../app-core/models/option-select";
import { DateUtils } from "../app-core/utils/date-utils";
import { FormValidations } from "../app-core/utils/form-validations";
import { Modelo } from "./models/modelo";

export abstract class CatalogoBase extends FormBaseComponent {

  MASKS: any = MASKS;
  DateMask = DateUtils.DataMask;
  DataDayMask = DateUtils.DataDayMask;

  componentForm: FormGroup;
  controlsFormBase: any;

  model: Modelo = new Modelo();
  tipoCasting: OptionSelect[] = Modelo.tipoCastingEnum;
  corOlhosEnum: OptionSelect[] = Modelo.corOlhosEnum;
  corCabeloEnum: OptionSelect[] = Modelo.corCabeloEnum;

  tipoCabeloEnum: OptionSelect[] = Modelo.tipoCabeloEnum;
  tipoCabeloComprimentoEnum: OptionSelect[] = Modelo.tipoCabeloComprimentoEnum;

  constructor(
    protected formBuilder: FormBuilder) {
    super();


    this.controlsFormBase = {
      nome: ['', [Validators.required, CustomValidators.rangeLength([3, 250])]],
      dtNascimento: ['', [Validators.required, FormValidations.data]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],

      diponibilidade: ['' ],
      tipoCasting: this.buildTipoCasting(),

      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],
      telefone2: ['', [NgBrazilValidators.telefone]],

      instagram: ['', [Validators.required]],
      facebook: [''],
      linkedin: [''],

      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        logradouro: ['', [Validators.required, Validators.maxLength(250)]],
        numero: ['', [Validators.required, CustomValidators.number]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        siglaUf: ['', [Validators.required]],
        nomeMunicipio: ['', [Validators.required]],
      }),

      altura: ['', [Validators.required, CustomValidators.number]],
      peso: ['', [Validators.required, CustomValidators.number]],
      manequim: ['', [Validators.required, CustomValidators.number]],
      sapato: ['', [Validators.required, CustomValidators.number]],

      corOlhos: [null, [Validators.required]],
      corCabelo: [null, [Validators.required]],
      tipoCabelo: [null, [Validators.required]],
      tipoCabeloComprimento: [null, [Validators.required]],

      //controles
      situacao: ['ATIVADO'],
      dthInclusao: [DateUtils.Format(new Date())],
      dthAtualizacao: ['15/03/2022'],

      imagem: ['', [Validators.required]]
    };

    this.validationMessages = {
    }
  }

  buildTipoCasting() {
    return this.formBuilder
      .array(this.tipoCasting.map(v => new FormControl(false)),
        FormValidations.requiredMinCheckbox(1));
  }

  getTipoCastingControls() {
    return this.componentForm.get('tipoCasting') ? (<FormArray>this.componentForm.get('tipoCasting')).controls : null;
  }


  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.componentForm);
  }

  protected configurarMensagensValidacaoBase() {
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }
}

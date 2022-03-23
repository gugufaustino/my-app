import { ElementRef } from "@angular/core";

import { FormGroup, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators, NgBrDirectives } from "ng-brazil";
import { CustomValidators } from "ng2-validation";

import { FormBaseComponent } from "../base-components/form-base.components";
import { DateUtils } from "../utils/date-utils";

export abstract class FornecedorBase extends FormBaseComponent {
    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;
    DataDayMask = DateUtils.DataDayMask;
    
    componentForm: FormGroup;
    controlsFormBase: any;
    protected dtVencValidators: any;
     
    constructor() {
        super();

        this.controlsFormBase = {
            razaoSocial: ['', [Validators.required, CustomValidators.rangeLength([3, 250])]],
            cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]],
            atividade: ['', [Validators.required, Validators.maxLength(250) ]],
            
            cep: ['', [Validators.required, NgBrazilValidators.cep ]],
            logradouro: ['', [Validators.required, Validators.maxLength(250) ]],
            numero: ['', [Validators.required, Validators.pattern("^[0-9]*$") ]],
            complemento: [''],
            bairro: ['', [Validators.required]],
            siglaUf: ['', [Validators.required]],
            nomeMunicipio: ['', [Validators.required]],
 
          };


          this.validationMessages = {
            razaoSocial: {
                required: 'campo requerido',
                rangeLength: 'tamanho deve ser entre 3 e 250 caracteres',
                 
            },
            cnpj: {
                required: 'campo requerido',
                cnpj: 'formato inválido',
            },
            atividade: {
                required: 'campo requerido',
                maxlength: 'tamanho máximo inválido',
            },
            cep: {
                required: 'campo requerido',
                cep: 'formato de CEP inválido',
            },
            logradouro :{
                required: 'campo requerido',
                maxlength: 'tamanho máximo inválido',
            },
            numero :{
                required: 'campo requerido',
                pattern: 'formato inválido',
            },
            bairro :{
                required: 'campo requerido',
            },
            siglaUf :{
                required: 'campo requerido',
            },
            nomeMunicipio :{
                required: 'campo requerido',
            }
        }
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.componentForm);
    }

    protected configurarMensagensValidacaoBase(){
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
}
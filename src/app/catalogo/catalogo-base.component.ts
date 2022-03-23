import { ElementRef } from "@angular/core";

import { FormGroup, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators, NgBrDirectives } from "ng-brazil";
import { CustomValidators } from "ng2-validation";

import { FormBaseComponent } from "../base-components/form-base.components";
import { DateUtils } from "../utils/date-utils";

export abstract class CatalogoBase extends FormBaseComponent {

    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;
    DataDayMask = DateUtils.DataDayMask;
    
    componentForm: FormGroup;
    controlsFormBase: any;


    constructor() {
        super();

        this.controlsFormBase = {
            // razaoSocial: ['', [Validators.required, CustomValidators.rangeLength([3, 250])]],
            // cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]],
            // atividade: ['', [Validators.required, Validators.maxLength(250) ]],
            
            // cep: ['', [Validators.required, NgBrazilValidators.cep ]],
            // logradouro: ['', [Validators.required, Validators.maxLength(250) ]],
            // numero: ['', [Validators.required, Validators.pattern("^[0-9]*$") ]],
            // complemento: [''],
            // bairro: ['', [Validators.required]],
            // siglaUf: ['', [Validators.required]],
            // nomeMunicipio: ['', [Validators.required]],
 
          };
          
          this.validationMessages = {
             
        }
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.componentForm);
    }

    protected configurarMensagensValidacaoBase(){
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
}
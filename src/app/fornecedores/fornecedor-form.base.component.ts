import { ElementRef } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { MASKS } from "ng-brazil";
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
            razaoSocial: ['', [Validators.required]],

          };


          this.validationMessages = {
            razaoSocial: {
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
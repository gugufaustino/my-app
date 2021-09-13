import { ElementRef } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { MASKS } from "ng-brazil";
import { FormBaseComponent } from "../base-components/form-base.components";
import { DateUtils } from "../utils/date-utils";

export abstract class ContasPagarBase extends FormBaseComponent {


    pagamentoForm: FormGroup;
    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;
    DataDayMask = DateUtils.DataDayMask;
 
    controlsFormBase: any;
    protected dtVencValidators: any;
    protected diaVencValidators: any;
     
    constructor() {
        super();

        this.controlsFormBase = {
            descricaoFornecedor: ['', [Validators.required]],
            tipoRecorrencia: ['', [Validators.required]],
            valor: ['', [Validators.required]],                
          };
          this.dtVencValidators = [Validators.required, Validators.required];          
          this.diaVencValidators = [Validators.required, Validators.min(1), Validators.max(31)];


          this.validationMessages = {
            descricaoFornecedor: {
                required: 'campo requerido',
            },
            tipoRecorrencia: {
                required: 'campo requerido'
            },
            valor: {
                required: 'campo requerido'                
            },
            dtVencimento: {
                required: 'campo requerido'                
            },
            diaVencimento: {
                required: 'campo requerido'                
            },
            
        }
        

       
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.pagamentoForm);
    }

    protected configurarMensagensValidacaoBase(){
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
}
import { ElementRef } from "@angular/core";
import { AbstractControl, AbstractControlOptions, FormGroup, Validators } from "@angular/forms";
import { MASKS } from "ng-brazil";
import { FormBaseComponent } from "../base-components/form-base.components";
import { DateUtils } from "../utils/date-utils";

export abstract class ContasPagarBase extends FormBaseComponent {


    pagamentoForm: FormGroup;
    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;
    DataDayMask = DateUtils.DataDayMask;
 
    controlsFormBase: any;
    dtVencValidators: any;
    diaVencValidators: any;
     
    constructor() {
        super();

        this.controlsFormBase = {
            descricaoFornecedor: ['', [Validators.required]],
            tipoRecorrencia: ['', [Validators.required]],
            valor: ['', [Validators.required]],    
            dtVencimento : []  ,
            diaVencimento : []    
          };
          this.dtVencValidators = ['', [Validators.required]]
          this.diaVencValidators = ['', [Validators.required]]
        

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.pagamentoForm);
    }
}
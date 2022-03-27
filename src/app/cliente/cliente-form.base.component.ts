import { ElementRef } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { MASKS } from "ng-brazil";
import { FormBaseComponent } from "../app-core/components/form-base.component";
import { DateUtils } from "../app-core/utils/date-utils";

export abstract class ClienteBase extends FormBaseComponent {


    // MASKS: any = MASKS;
    // DateMask = DateUtils.DataMask;
    // DataDayMask = DateUtils.DataDayMask;

    componentForm: FormGroup;
    controlsFormBase: any;
    protected dtVencValidators: any;

    constructor() {
        super();

        this.controlsFormBase = {
            nome: ['', [Validators.required]],

          };
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.componentForm);
    }

    protected configurarMensagensValidacaoBase(){
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }
}

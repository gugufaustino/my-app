import { ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { FormBaseComponent } from "../app-core/components/form-base.component";
import { DateUtils } from "../app-core/utils/date-utils";
import { FormValidations } from "../app-core/utils/form-validations";

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
            valor: ['', [Validators.required, NgBrazilValidators.currency]],
          };
          this.dtVencValidators = [Validators.required,  FormValidations.data];
          this.diaVencValidators = [Validators.required, Validators.min(1), Validators.max(31)];


          this.validationMessages = {
            diaVencimento: {
                min: 'valor míninmo inválido',
                max: 'valor maximo inválido',
            },
        }
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.pagamentoForm);
    }

    protected configurarMensagensValidacaoBase(){
        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    tipoRecorrencia(): FormControl | any {
        return this.pagamentoForm.get('tipoRecorrencia');
    }
}

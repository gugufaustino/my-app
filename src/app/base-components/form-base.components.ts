import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utils/generic-form-validation';
import { MappingModel } from '../base-contracts/models/mapping.model';
import { CurrencyUtils } from '../utils/currency-utils';
import { DateUtils } from '../utils/date-utils';
import { MASKS } from "ng-brazil";

import { IFormComponent } from './iform.component';

export abstract class FormBaseComponent implements IFormComponent {
    mudancasNaoSalvas: boolean;

    errors: any = [];
    displayMessage: DisplayMessage = {};
    genericValidator: GenericValidator;
    validationMessages: ValidationMessages;

    MASKS: any = MASKS;
    DateMask = DateUtils.DataMask;
    DataDayMask = DateUtils.DataDayMask;

    protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected configurarValidacaoFormularioBase(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.validarFormulario(formGroup)
        });
    }

    protected validarFormulario(formGroup: FormGroup, allControls: boolean = false) {

        this.displayMessage = this.genericValidator.processaMensgens(formGroup, allControls);
        this.mudancasNaoSalvas = true;
    }

    protected mapToModel(source1: MappingModel, source2: any): any {
        /*
           this.pagamento = Object.assign({}, this.pagamento, this.pagamentoForm.value)
            this.pagamento.valor = CurrencyUtils.StringParaDecimal(this.pagamento.valor);
            this.pagamento.tipoRecorrencia = parseInt(this.pagamento.tipoRecorrencia.toString());
            this.pagamento.dtVencimento = DateUtils.StringParaDate(this.pagamento.dtVencimento.toString());

        */
        let model = Object.assign({}, source1, source2);
        var propertys = Reflect.ownKeys(source2)

        for (let i = 0; i < propertys.length; i++) {
            const propKey = propertys[i];
            const propDescr: PropertyDescriptor | undefined = Reflect.getOwnPropertyDescriptor(source2, propKey)
            if (propDescr !== undefined) {
                let mapProperty = source1?.mappings.filter(i => i[propKey] != undefined);
                if (mapProperty.length == 1) {

                    let mapType = mapProperty[0][propKey];
                    let modelValue = model[propKey];
                    let parsed = null;

                    if (mapType == "number" && modelValue != "" && modelValue != null) {
                        if (modelValue.indexOf(",") > 0) // temvirgula é decimal
                            parsed = CurrencyUtils.StringParaDecimal(modelValue);
                        else
                            parsed = CurrencyUtils.ExtractNumber(modelValue);

                            if (isNaN(parsed)){
                                throw "Erro na conversao em 'mapToModel()'";
                            }

                        model[propKey] = parsed;
                    } else if (mapType == "Date" && modelValue != "" && modelValue != null) {
                        model[propKey] = DateUtils.StringParaDate(modelValue.toString());
                    }
                }
            }
        }
        return model;
    }

    protected desabilitaCampo(form: any, name: string, dfaultVal?: string) {

        //Reseta atributos ao estado original, value, touched, dirty,
        form.get(name)?.clearValidators();
        form.get(name)?.disable();
        form.get(name).value = dfaultVal;
        form.get(name).touched = false;
        form.get(name).pristine= true;
        form.patchValue({ [name]: dfaultVal });

    }

}

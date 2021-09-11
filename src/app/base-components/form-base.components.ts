import { ElementRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utils/generic-form-validation';
import { IMappingModel } from '../base-models/IMappingModel';
import { CurrencyUtils } from '../utils/currency-utils';
import { DateUtils } from '../utils/date-utils';

export abstract class FormBaseComponent {

    displayMessage: DisplayMessage = {};
    genericValidator: GenericValidator;
    validationMessages: ValidationMessages;

    mudancasNaoSalvas: boolean;

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

    protected validarFormulario(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processaMensgens(formGroup);
        this.mudancasNaoSalvas = true;
    }

    protected mapToModel(source1: IMappingModel, source2: any): any {

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

                    if (mapType == "number") {
                        if (modelValue.indexOf(",") > 1) // temvirgula é decimal
                            parsed = CurrencyUtils.StringParaDecimal(modelValue);
                        else
                            parsed = parseFloat(modelValue);

                        model[propKey] = parsed;
                    }else if(mapType == "Date" && modelValue != ""){
                        model[propKey] = DateUtils.StringParaDate(modelValue.toString());
                    }
                }
            }
        }
        return model;
    }

}
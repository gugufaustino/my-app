import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utils/generic-form-validation';
import { MappingModel } from '../interfaces/models/mapping.model';
import { CurrencyUtils } from '../utils/currency-utils';
import { DateUtils } from '../utils/date-utils';
import { MASKS, NgBrazilValidators } from "ng-brazil";

import { IFormComponent } from '../interfaces/components/iform.component';
import { CustomValidators } from 'ng2-validation';
import { FormValidations } from '../utils/form-validations';
import { OptionSelect } from '../models/option-select';
import { Modelo } from 'src/app/modelo/models/modelo';
import { CoreEnum } from '../utils/core-enum';

declare function translateWithI18next(): any;
export abstract class FormBaseComponent implements IFormComponent {

  mudancasNaoSalvas: boolean;
  errors: any[] = [];
  validations: any[] = [];
  displayMessage: DisplayMessage | any = {} ;
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  MASKS: any = MASKS;
  DateMask = DateUtils.DataMask;
  DataDayMask = DateUtils.DataDayMask;

  readonly CoreEnum : CoreEnum = new CoreEnum();


  protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configurarValidacaoFormularioBase(formInputElements: ElementRef[], formGroup: FormGroup) {

    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => {
        this.configurarCssClass(formControl, formGroup);
        return fromEvent(formControl.nativeElement, 'blur');
      });

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario(formGroup)
    });
  }

  protected configurarBase() {
    translateWithI18next();
  }

  protected validarFormulario(formGroup: FormGroup, allControls: boolean = false) {

    const reavaliadas = this.genericValidator.processaMensgens(formGroup, allControls);
    this.displayMessage = Object.assign(this.displayMessage, reavaliadas);
    this.mudancasNaoSalvas = true;
  }


  protected configurarCssClass(formControl: ElementRef, formGroup: FormGroup) {

    const formcontrolname = formControl.nativeElement.attributes['formcontrolname']?.value;
    let control = formGroup.get(formcontrolname);

    if (control?.hasValidator(CustomValidators.number) || control?.hasValidator(NgBrazilValidators.currency)) {
      this.addClass(formControl, 'text-right')
    }

    if (control?.hasValidator(FormValidations.data)) {
      this.addClass(formControl, 'text-center')
    }

    //console.log(formControl.nativeElement.attributes["ng-reflect-text-mask-config"]?.value)
    //nativeElement.attributes[formcontrolname]
  }

  protected mapToModel(source1: MappingModel, source2: any): any {

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
          let parsed : any = null;

          if (mapType == "number"
                && modelValue != null
                && modelValue != ''
                && typeof(modelValue) != 'number') // se já é numero nao precisa tratar
          {
            if (modelValue.indexOf(",") > 0) // temvirgula é decimal
              parsed = CurrencyUtils.StringParaDecimal(modelValue);
            else
              parsed = CurrencyUtils.ExtractNumber(modelValue);

            if (isNaN(parsed)) {
              throw "Erro na conversao de numero em 'mapToModel()'";
            }

            model[propKey] = parsed;
          } else if (mapType == "number[]" && modelValue != "" && modelValue != null) {

            parsed = this.parseFormArrayToValues(modelValue);
            model[propKey] = parsed;
          } else if (mapType == "Date" && modelValue != "" && modelValue != null) {
            model[propKey] = DateUtils.StringParaDate(modelValue.toString());
          }
        }
      }
    }
    return model;
  }

  parseFormArrayToValues(values: Number[]): string[] {

    const optiosSelect =  Modelo.tipoCastingEnum;
    const lstTipoCastinEnum = optiosSelect.map((op: OptionSelect) => op.value);
    return Object.assign([], values.map((value: any, i: number) => value ? lstTipoCastinEnum[i] : null)
                                                          .filter((value: any) => value !== null));
  }

  protected desabilitaCampo(form: any, name: string, dfaultVal?: string) {

    //Reseta atributos ao estado original, value, touched, dirty,
    form.get(name)?.clearValidators();
    form.get(name)?.disable();
    form.get(name).value = dfaultVal;
    form.get(name).touched = false;
    form.get(name).pristine = true;
    form.patchValue({ [name]: dfaultVal });

  }

  private addClass(formControl: ElementRef, cssClass: string) {

    formControl.nativeElement.classList.add(cssClass);
  }

  protected processarSucessoBase() {
    this.validations = [];
    this.errors = [];
    this.mudancasNaoSalvas = false;
  }

  protected processarFalha(fail: any) {
    this.validations = fail?.error?.validations ?? [];
    this.errors = fail?.error?.errors ?? [];

  }

}

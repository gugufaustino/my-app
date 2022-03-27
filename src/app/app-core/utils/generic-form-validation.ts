import { FormGroup } from '@angular/forms';

export class GenericValidator {

  baseMessages: any;

  constructor(private validationMessages: ValidationMessages) {
    this.baseMessages = this.getBaseMessages;
  }

  processaMensgens(container: FormGroup, allControls: boolean = false): { [key: string]: string } {

    let messages: { [key: string]: string } = {};

    for (let controlKey in container.controls) {

      if (container.controls.hasOwnProperty(controlKey)) {

        let c = container.controls[controlKey];

        if (c instanceof FormGroup) {
          let childMessages = this.processaMensgens(c);
          Object.assign(messages, childMessages);
        } else {
          //if (this.validationMessages[controlKey]) {
          messages[controlKey] = '';
          if ((c.dirty || c.touched || allControls) && c.errors && c.enabled) {
            Object.keys(c.errors).map(messageKey => {

              if (this.baseMessages[messageKey]) {
                messages[controlKey] += this.baseMessages[messageKey];
              } else if (this.validationMessages[controlKey][messageKey]) {
                messages[controlKey] += this.validationMessages[controlKey][messageKey]
              }

            });
          }
        }
        //}
      }
    }

    return messages;
  }

  private get getBaseMessages(): any {
    return {
      required: 'campo obrigatório',
      data: 'data no formato inválido',
      cpf: 'CPF no formato inválido',
      cnpj: 'CNPJ no formato inválido',
      email: 'e-mail no formato inválido',
      telefone: 'telefone no formato inválido',
      cep: 'formato de CEP inválido',
      number: 'formato inválido',
      maxlength: 'tamanho máximo inválido',
    };
  }

}

export interface DisplayMessage {
  [key: string]: string
}

export interface ValidationMessages {
  [key: string]: { [key: string]: string }
}

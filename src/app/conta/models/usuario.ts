import { OptionSelect } from "src/app/app-core/models/option-select";

export class Usuario {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;

    nome: string;
    cpf: string;
    telefone: string;
    tipoCadastro: number;

      public static get tipoCadastroEnum(): OptionSelect[] {
      return [
        new OptionSelect(1, 'Agente'),
        new OptionSelect(2, 'Agência'),

      ]
    }
}

export enum TipoCadastroEnum  {
  Agente = 1,
  Agencia = 2,
}

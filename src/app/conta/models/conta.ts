
export class Conta {

    email: string;
    password: string;
    confirmPassword: string;

    nome: string;
    cpf: string;
    telefone: string;
    tipoCadastro: number;
}

export enum TipoCadastroEnum  {
  Agente = 1,
  Agencia = 2,
}

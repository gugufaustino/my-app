import { TipoCadastroEnum } from "src/app/conta/models/conta";

export class UserToken {
    id: string;
    email: string;
    nome: string;
    tipoCadastro: TipoCadastroEnum;
    agencia: Agencia;
    agenciaTipoSituacao : TipoSituacaoAgenciaEnum
    claims: string[];
}

export class Agencia {
  nomeAgencia : string
}


export enum TipoSituacaoAgenciaEnum  {
  EmElaboracao = 0,
  Ativado = 1,
}




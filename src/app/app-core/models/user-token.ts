import { TipoCadastroEnum } from "src/app/conta/models/conta";

export class UserToken {
    id: string;
    email: string;
    nome: string;
    tipoCadastro: TipoCadastroEnum;
    agencia: any;
    claims: string[];
}


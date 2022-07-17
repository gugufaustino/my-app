import { TipoCadastroEnum } from "src/app/conta/models/usuario";

export class UserToken {
    id: string;
    email: string;
    nome: string;
    tipoCadastro: TipoCadastroEnum;
    claims: string[];
}


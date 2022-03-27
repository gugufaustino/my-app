import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";

export class Modelo implements MappingModel {
    constructor() { this.toMap(); }
    id: string;

    //dados basicos
    nome: string;
    dtNascimento: Date;
    rg: string;
    cpf: string;

    //tipo de modelo
    diponibilidade: string;
    tipoCasting: Number[];

    //contato
    email: string;
    telefone: string[];

    //endereço
    cep: string;
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    siglaUf: string;
    nomeMunicipio: string;


    mappings: any[];
    toMap(): void {
        this.mappings = [


        ]
    }

}

import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";


export class Fornecedor implements MappingModel {
    constructor() { this.toMap(); }

    id: number;
    razaoSocial: string;
    cnpj: string;
    atividade: string;
    informacoesAdicionais: string;

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
            { id: "number" },
            { razaoSocial: "string" },
            { cnpj: "string" },
            { atividade: "string" },
            { informacoesAdicionais: "string" },
            { cep: "string" },
            { numero: "string" },
            { complemento: "string" },
            { bairro: "string" },
            { siglaUf: "string" },
            { nomeMunicipio: "string" },
        ];
    }


}

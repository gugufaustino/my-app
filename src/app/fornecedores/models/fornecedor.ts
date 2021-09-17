import { MappingModel } from "src/app/base-contracts/models/mapping.model";


export class Fornecedor implements MappingModel {
    constructor() { this.toMap(); }

    id: number;
    razaoSocial: string;
    cnpj: string;
    atividade: string;
    informacoesAdicionais: string

    mappings: any[];
    toMap(): void {
        this.mappings = [
            { id: "number" },
            { razaoSocial: "stringr" },
            { atividade: "stringr" },
            { informacoesAdicionais: "stringr" }];
    }


}
import { MappingModel } from "src/app/base-contracts/models/mapping.model";

export class Modelo implements MappingModel {
    constructor() { this.toMap(); }
    id: string;
    nome: string;
    cpf: string;

    email: string;
    telefone: string;

    mappings: any[];
    toMap(): void {
        //throw new Error("Method not implemented.");
    }

}
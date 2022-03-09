import { MappingModel } from "src/app/base-contracts/models/mapping.model";


export class Cliente implements MappingModel {
    constructor() { this.toMap(); }

    id: number;
    nome: string;    
    

    mappings: any[];
    toMap(): void {
        this.mappings = [
            { id: "number" },
            { nome: "string" },
            ];
    }


}
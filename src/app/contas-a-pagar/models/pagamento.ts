import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";

export class Pagamento implements MappingModel {
    constructor( ) {

        this.toMap();
    }
    mappings: any[];

    id: number;
    descricaoFornecedor: string;
    valor: number;
    dtVencimento: Date;
    indPago: boolean;
    diaVencimento: number;
    tipoRecorrencia: number;

    public toMap(): void {
        this.mappings = [
            { id: "number" },
            { descricaoFornecedor: "string" },
            { valor: "number" },
            { dtVencimento: "Date" },
            { indPago: "boolean" },
            { diaVencimento: "number" },
            { tipoRecorrencia: "number" },
        ];
    }
}


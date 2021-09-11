import { IMappingModel } from "src/app/base-models/IMappingModel";
export class Pagamento implements IMappingModel {
    constructor() {
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


export interface ContaPagamento {
    id: string;
    descricaoFornecedor: string;
    valor: number ;   
    dtVencimento: string;
    indPago: boolean;
}
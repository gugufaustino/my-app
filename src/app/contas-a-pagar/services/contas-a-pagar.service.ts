import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaserService } from "src/app/services/base.service";
import { IObter } from "src/app/app-core/interfaces/services/iobter.service";
import { Pagamento } from "../models/pagamento";
import { CustomResponse } from "src/app/app-core/models/custom-response";



@Injectable()
export class ContasAPagarService<TEntity> extends BaserService
    implements IObter<TEntity> {

    constructor(private http: HttpClient) { super(); }

    public listarTodos(): Observable<Pagamento[]> {
        return this.http
            .get<Pagamento[]>(this.UrlServiceV1 + 'conta/', this.ObterHeaderAuthJson())
            .pipe(catchError(this.serviceError));
    }

    public obterPorId(id: string): Observable<TEntity> {
        return this.http
            .get<TEntity>(this.UrlServiceV1 + 'pagamento/' + id, this.ObterHeaderAuthJson())
            .pipe(catchError(this.serviceError));
    }

    public editar(pagamento: Pagamento): Observable<CustomResponse> {
        let response = this.http.put(this.UrlServiceV1 + 'pagamento/' + pagamento.id, pagamento, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractDefault),
                catchError(this.serviceError));

        return response;

    }


    // map(this.extractData),
    public excluir(id: number): Observable<Pagamento> {
        let response = this.http.delete(this.UrlServiceV1 + 'pagamento/' + id, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
        return response;
    }


    public inserir(conta: Pagamento): Observable<CustomResponse> {
        let response = this.http.post(this.UrlServiceV1 + 'conta/', conta, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractDefault),
                catchError(this.serviceError));
        return response;
    }

    public editarPago(id: number, indPago: boolean): Observable<Pagamento> {
        let response = this.http
            .put(this.UrlServiceV1 + 'pagamento/pago/' + id, indPago, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
        return response;
    }
}


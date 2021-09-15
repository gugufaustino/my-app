import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaserService } from "src/app/services/base.service";
import { Pagamento } from "../models/pagamento";



@Injectable()
export class ContasAPagarService extends BaserService {
    constructor(private http: HttpClient) { super(); }

    public listarTodos(): Observable<Pagamento[]> {
        return this.http
            .get<Pagamento[]>(this.UrlServiceV1 + 'conta/', this.ObterHeaderAuthJson())
            .pipe(catchError(this.serviceError));
    }

    public obterPorId(id: string): Observable<Pagamento> {
        return this.http
            .get<Pagamento>(this.UrlServiceV1 + 'pagamento/' + id, this.ObterHeaderAuthJson())
            .pipe(catchError(this.serviceError));
    }

    public editar(pagamento: Pagamento): Observable<Pagamento> {
        let response = this.http
            .put(this.UrlServiceV1 + 'pagamento/' + pagamento.id, pagamento, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
        return response;
    }

    public excluir(id: number): Observable<Pagamento> {
        let response = this.http.delete(this.UrlServiceV1 + 'pagamento/' + id, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
        return response;
    }


    public inserir(conta: Pagamento): Observable<any> {
        let response = this.http.post(this.UrlServiceV1 + 'conta/', conta, this.ObterHeaderAuthJson())
            .pipe( 
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
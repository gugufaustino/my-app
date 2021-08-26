import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaserService } from "src/app/services/base.service";
import { ContaPagamento } from "../models/contapagamento";



@Injectable()
export class ContasAPagarService extends BaserService {
    
    constructor(private http: HttpClient) { super(); }
 
    public listarTodos(): Observable<ContaPagamento[]> {
        return this.http
            .get<ContaPagamento[]>(this.UrlServiceV1 + 'conta/', this.ObterHeaderAuthJson())
            .pipe(catchError(this.serviceError));
    }
    
    public obterPorId(id: string): Observable<ContaPagamento> {
        return this.http
            .get<ContaPagamento>(this.UrlServiceV1 + 'conta/' + id, this.ObterHeaderAuthJson())
            .pipe(catchError(this.serviceError));
    }


}
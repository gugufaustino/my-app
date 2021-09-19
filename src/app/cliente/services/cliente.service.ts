import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IObter } from 'src/app/base-contracts/services/iobter.service';
import { BaserService } from 'src/app/services/base.service';
import { Cliente } from '../models/cliente';


@Injectable()
export class ClienteService<TEntity> extends BaserService
  implements IObter<TEntity> {

  private apiUrl: string = 'cliente/';

  constructor(private http: HttpClient) { super(); }

  obterPorId(id: string): Observable<TEntity> {
    return this.http
      .get<TEntity>(this.UrlServiceV1 + this.apiUrl + id, this.ObterHeaderAuthJson())
      .pipe(catchError(this.serviceError));
  }

  public listarTodos(): Observable<TEntity[]> {
    return this.http
      .get<TEntity[]>(this.UrlServiceV1 + this.apiUrl, this.ObterHeaderAuthJson())
      .pipe(catchError(this.serviceError));
  }

  public inserir(conta: TEntity): Observable<any> {
    let response = this.http.post(this.UrlServiceV1 + this.apiUrl, conta, this.ObterHeaderAuthJson())
      .pipe(catchError(this.serviceError));
    return response;
  }


  public excluir(id: number): Observable<TEntity> {
    let response = this.http.delete(this.UrlServiceV1 + this.apiUrl + id, this.ObterHeaderAuthJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  public editar(model: Cliente): Observable<TEntity> {
    let response = this.http
      .put(this.UrlServiceV1 + this.apiUrl + model.id, model, this.ObterHeaderAuthJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }


}

import { CatalogoModeloFilter } from './../models/catalogo-filtro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IObter } from 'src/app/app-core/interfaces/services/iobter.service';
import { CustomResponse } from 'src/app/app-core/models/custom-response';
import { BaserService } from 'src/app/services/base.service';
import { Modelo } from '../models/modelo';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CatalogoService<TEntity> extends BaserService
  implements IObter<TEntity> {
  private apiUrl: string = 'modelo/';

  constructor(private http: HttpClient) { super(); }
  obterPorId(id: string): Observable<TEntity> {
    return this.http
      .get<TEntity>(this.UrlServiceV1 + this.apiUrl + id, this.ObterHeaderAuthJson())
      .pipe(catchError(this.serviceError));
  }

  public listarTodos(modelo: CatalogoModeloFilter): Observable<TEntity[]> {
    let objectSerialize = Object.assign({} as any, modelo);
    delete objectSerialize["mappings"];

    //TODO #2 Transformar esse map em um metodo genérico, pode ser na classe Util. Validar se essa implementação funciona para todos os cast de objetos complexos e com aspas no texto
    let queryString = this.serializeToQueryString(objectSerialize);

    const options = { headers: this.ObterHeaderAuthJson().headers }   /*params : new HttpParams().set('nome', modelo.nome )*/
    return this.http
      .get<TEntity[]>(this.UrlServiceV1 + this.apiUrl + "?" + queryString, options)
      .pipe(catchError(this.serviceError));
  }

  public inserir(modelo: TEntity): Observable<CustomResponse> {
    let response = this.http.post<CustomResponse>(this.UrlServiceV1 + this.apiUrl, modelo, this.ObterHeaderAuthJson())
      .pipe(catchError(this.serviceError));
    return response;
  }

  public excluir(id: number): Observable<TEntity> {
    let response = this.http.delete(this.UrlServiceV1 + this.apiUrl + id, this.ObterHeaderAuthJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  public editar(model: Modelo): Observable<TEntity> {
    let response = this.http
      .put(this.UrlServiceV1 + this.apiUrl + model.id, model, this.ObterHeaderAuthJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

}

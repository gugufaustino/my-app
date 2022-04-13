import { CatalogoFiltro } from './../models/catalogo-filtro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IObter } from 'src/app/app-core/interfaces/services/iobter.service';
import { CustomResponse } from 'src/app/app-core/models/custom-response';
import { BaserService } from 'src/app/services/base.service';

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

  public listarTodos(modelo: CatalogoFiltro): Observable<TEntity[]> {

    //TODO #2 Transformar esse map em um metodo genérico, pode ser na classe Util. Validar se essa implementação funciona para todos os cast de objetos complexos e com aspas no texto
    let queryString = Object.keys(modelo).map(key => key + '=' + ((modelo) as any)[key] ).join('&');

    var options  = {
      headers: this.ObterHeaderAuthJson().headers,
      //params : new HttpParams().set('nome', modelo.nome )
    }
    return this.http
      .get<TEntity[]>(this.UrlServiceV1 + this.apiUrl + "?" + queryString,  options )
      .pipe(catchError(this.serviceError));
  }

  public inserir(modelo: TEntity): Observable<CustomResponse> {
    let response = this.http.post<CustomResponse>(this.UrlServiceV1 + this.apiUrl, modelo, this.ObterHeaderAuthJson())
      .pipe(catchError(this.serviceError));
    return response;
  }

}

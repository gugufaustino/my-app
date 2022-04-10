import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IObter } from 'src/app/app-core/interfaces/services/iobter.service';
import { BaserService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CatalogoService<TEntity> extends BaserService
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
      .get<TEntity[]>('assets/dados/modelos.json' , this.ObterHeaderAuthJson()) //this.UrlServiceV1 + this.apiUrl
      .pipe(catchError(this.serviceError));
  }

}

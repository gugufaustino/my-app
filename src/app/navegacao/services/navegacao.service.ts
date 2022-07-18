import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Conta } from 'src/app/conta/models/conta';
import { BaserService } from 'src/app/services/base.service';

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

//{  providedIn: 'root'}
@Injectable()
export class NavegacaoService extends BaserService {

  constructor(private http: HttpClient) { super(); }

  obterApelido(email: string): Observable<Conta> {

    let response = this.http.get(this.UrlServiceV1 + 'cadastro/obter-apelido/' + email, this.ObterHeaderAuthJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    return response;
  }



}

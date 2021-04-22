import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from 'src/app/conta/models/usuario';
import { BaserService } from 'src/app/services/base.service';

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

//{  providedIn: 'root'}
@Injectable()
export class NavegacaoService extends BaserService {

  constructor(private http: HttpClient) { super(); }

  obterApelido(usuario: Usuario): Observable<Usuario> {

    let response = this.http.get(this.UrlServiceV1 + 'cadastro/obter-apelido/' + usuario.email, this.ObterHeaderAuthJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    return response;
  }



}

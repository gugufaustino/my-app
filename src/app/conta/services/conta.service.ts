import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Conta } from "../models/conta";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaserService } from "src/app/services/base.service";
import { Agencia } from "../models/agencia";
import { Login } from "../models/login";

@Injectable()
export class ContaService extends BaserService {


    constructor(private http: HttpClient) { super(); }

    registraUsuario(usuario: Conta): Observable<Conta> {
        let response = this.http
            .post(this.UrlServiceV1 + 'registrar-conta', usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
        return response;
    }

    registraAgencia(agencia: Agencia): Observable<Agencia> {
      let response = this.http
            .post(this.UrlServiceV1 + 'cadastro/adicionar-agencia', agencia, this.ObterHeaderAuthJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
          return response;
    }

    login(login: Login): Observable<Login> {
        let response = this.http.post(this.UrlServiceV1 + 'login', login, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
        return response;
    }

}

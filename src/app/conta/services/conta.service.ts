import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
 
import { Usuario } from "../models/usuario";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaserService } from "src/app/services/base.service";

@Injectable()
export class ContaService extends BaserService {

    constructor(private http: HttpClient) { super(); }

    registraUsuario(usuario: Usuario): Observable<Usuario> {
        let response = this.http
            .post(this.UrlServiceV1 + 'cadastro', usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    login(usuario: Usuario) {

    }

}
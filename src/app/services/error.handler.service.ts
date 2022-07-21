import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "../app-core/utils/localstorage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  private localStorageUtil = new LocalStorageUtils()

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(

      catchError(error => {
        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {
            this.localStorageUtil.limparDadosLocaisUsuario();
            this.router.navigate(['conta/login'], { queryParams: { returnUrl: this.router.url } })
            return throwError(['Acesso expirou, faça login novamente']); // cancela toast

          } else if (error.status === 403) {
            this.router.navigate(['acesso-negado'])
            return throwError({}); // cancela toast
          }
          //400 BadRequest || Rns
        }
        return throwError(error);
      }),

      finalize(() => {})

      );
  }
}

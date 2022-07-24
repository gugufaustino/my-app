import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomResponse } from "../app-core/models/custom-response";
import { LocalStorageUtils } from "../app-core/utils/localstorage";


export abstract class BaserService {
  protected UrlServiceV1: string = environment.urlServiceV1;

  public LocalStorage = new LocalStorageUtils();

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  protected ObterHeaderAuthJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.LocalStorage.obterToken()
      })
    };
  }

  protected extractDefault(response: any): CustomResponse {
    return Object.assign(new CustomResponse(), response);
  }
  protected extractData(response: any) {
    console.log(response)
    console.log(response.data || {})
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];
    let customResponse: any = { error: { errors: [] } }

    if (response instanceof HttpErrorResponse) {

      if (response.statusText === "Unknown Error") {
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError;
      }
    }

    // Erros do tipo 500/404 não possuem uma lista de erros, como a lista de erros do HttpErrorResponse é readonly, é criado um fake
    if (response.status === 500 || response.status === 404) {
      switch (response.status) {
        case 500:
          customError.push("Ocorreu um erro interno na aplicação, por favor informe o nosso suporte.");
          break;
        case 404:
          customError.push("Resposta de falha de HTTP 404 não encontrado, por favor informe o nosso suporte.");
          break;
      }

      customResponse.error.errors = customError;
      console.log("serviceError", response)
      return throwError(customResponse);

    }

    console.log("serviceError", response)
    return throwError(response);
  }

  protected serializeToQueryString(obj: any, prefix: string = ''): string {
    let str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];

        str.push((v !== null && typeof v === "object") ?
          this.serializeToQueryString(v, k)
          : encodeURIComponent(k) + "=" + (v === null ? '' : encodeURIComponent(v)));
      }
    }
    return str.join("&");
  }
}


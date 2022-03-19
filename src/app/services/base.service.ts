import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { CustomResponse } from "../base-contracts/models/custom-response";
import { LocalStorageUtils } from "../utils/localstorage";


    export abstract class BaserService {
    protected UrlServiceV1: string = "https://localhost:44390/api/"; // "https://myapi.cteclima.com.br/api/";
    //protected UrlServiceV1: string = "https://localhost:5001/api/"; 
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
        return Object.assign(new CustomResponse(),response);
    }
    protected extractData(response: any) {
        console.log(response)
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
        if (response.status === 500) {
            customError.push("Ocorreu um erro interno na aplicação, por favor informe o nosso suporte.");
            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly                
            customResponse.error.errors = customError;
            console.log(response)
            return throwError(customResponse);
        }
  
        console.log(response)
        return throwError(response);
    }
}


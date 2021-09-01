import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";


export abstract class BaserService {
    protected UrlServiceV1: string = "https://localhost:44390/api/";
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

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }else if(response.statusText === "Unauthorized" || response.statusText === "Forbidden"){
                customError.push("Acesso não autorizado");
                var responseFake: any = {};
                responseFake.error = {}
                responseFake.error.errors = customError;
 
                return throwError(responseFake);
            }
        }         
        return throwError(response);
    }
}

 
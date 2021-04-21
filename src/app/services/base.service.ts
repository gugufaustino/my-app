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

    protected extractData(response: any) {
        console.info(response.data || {});
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }else if(response.statusText === "Unauthorized"){
                customError.push("Acesso não autorizado");
                var responseFake: any = {};
                responseFake.error = {}
                responseFake.error.errors = customError;

                console.error(responseFake);
                return throwError(responseFake);
            }
        }
         
        console.error(response);
        return throwError(response);
    }
}
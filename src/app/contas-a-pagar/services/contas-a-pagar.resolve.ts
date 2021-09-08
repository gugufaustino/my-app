import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Pagamento } from "../models/pagamento";
import { ContasAPagarService } from "./contas-a-pagar.service";

@Injectable()
export class ContasAPagarResolve implements Resolve<Pagamento> {

    constructor(private contasAPagarService: ContasAPagarService) {    }

    resolve(route: ActivatedRouteSnapshot)  {
        return this.contasAPagarService.obterPorId(route.params["id"]);
    }
}
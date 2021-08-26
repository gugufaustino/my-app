import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ContaPagamento } from "../models/contapagamento";
import { ContasAPagarService } from "./contas-a-pagar.service";

@Injectable()
export class ContasAPagarResolve implements Resolve<ContaPagamento> {

    constructor(private contasAPagarService: ContasAPagarService) {    }

    resolve(route: ActivatedRouteSnapshot)  {
        return this.contasAPagarService.obterPorId(route.params["id"]);
    }
}
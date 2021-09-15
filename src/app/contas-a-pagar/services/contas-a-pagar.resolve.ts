import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ServiceResolver } from "./contas-a-pagar.service";

@Injectable()
export class ContasAPagarResolve<TEntity> implements Resolve<TEntity> {

    constructor(private serviceObter: ServiceResolver<TEntity>) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.serviceObter.obterPorId(route.params["id"]);
    }
}
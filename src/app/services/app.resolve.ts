import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AppResolveService } from "./app.resolve.service";


@Injectable()
export class AppResolve<TEntity> implements Resolve<TEntity> {

    constructor(private serviceObter: AppResolveService<TEntity>) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.serviceObter.obterPorId(route.params["id"]);
    }
}

 
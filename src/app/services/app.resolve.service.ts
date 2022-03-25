import { Observable } from "rxjs";
import { IObter } from "../base-contracts/services/iobter.service";

export abstract class AppResolveService<TEntity> implements IObter<TEntity> {

  obterPorId: (id: string) => Observable<TEntity>

}

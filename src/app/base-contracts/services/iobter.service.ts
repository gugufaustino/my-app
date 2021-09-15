
import { Observable } from "rxjs";


export interface IObter<T>{    
    obterPorId(id: string):Observable<T>;   
}

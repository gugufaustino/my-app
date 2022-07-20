import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable()
export class ToastAppService {

  constructor(private toastr: ToastrService) { }

  public success(mensagem: string[], titulo?: string, observer?: any): void {

    let config = { timeOut: 800 } as IndividualConfig;

    let mens = mensagem == undefined
      ? 'Operação realizada!'
      : mensagem[0] ?? ''.toString();

    let toast = this.toastr.success(mens, titulo, config);
    if (toast && observer != null) {
      toast.onHidden.subscribe(observer);
    }
  }


  public error(throwError: any, titulo?: string, observer?: any): void {

    titulo = titulo ?? "Erro";
    let toast:any ;
    if (throwError?.error?.errors != null) {

      let arrMens = throwError?.error?.errors.join()
      toast = this.toastr.error(arrMens, titulo);

    }
    else if (throwError?.error != null) {

      toast = this.toastr.error(throwError?.error, titulo);

    } else {
      if (this.isNullObj(throwError)) {
        toast =   this.toastr.error("", titulo);
      } else {
        toast = this.toastr.error(throwError, titulo);
      }
    }

    if (toast && observer != null) {
      toast.onHidden.subscribe(observer);
    }

  }

  private isNullObj(throwError: any): boolean {
    return (throwError && Object.keys(throwError).length === 0 && throwError.constructor === Object)
  }




}

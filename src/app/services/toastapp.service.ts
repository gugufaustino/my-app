import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable()
export class ToastAppService {

  constructor(private toastr: ToastrService) { }

  public success(mensagem: string[], titulo?: string, observer?: any): void {

    let config = { timeOut: 1200 } as IndividualConfig;

    let mens = mensagem == undefined
      ? 'Operação realizada!'
      : mensagem[0] ?? ''.toString();

    let toast = this.toastr.success(mens, titulo, config);
    if (toast && observer != null) {
      toast.onHidden.subscribe(observer);
    }
  }


  public error(throwError: any, titulo?: string): void {

    if (throwError?.error?.errors != null) {

      let arrMens = throwError?.error?.errors.join()
      this.toastr.error(arrMens, "Erro");

    }
    else if (throwError?.error != null) {

      this.toastr.error(throwError?.error, "Erro");

    } else {
      if (this.isNullObj(throwError)) {
        this.toastr.error("", "Erro");
      } else {
        this.toastr.error(throwError, "Erro");
      }
    }

  }

  private isNullObj(throwError: any): boolean {
    return (throwError && Object.keys(throwError).length === 0 && throwError.constructor === Object)
  }




}

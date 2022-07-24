import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable()
export class ToastAppService {

  constructor(private toastr: ToastrService) { }

  public success(mensagem: string[] | undefined, titulo?: string, observer?: any): void {

    let config = { timeOut: 1000 } as IndividualConfig;

    let mens = (mensagem == undefined || mensagem.length == 0)
      ? 'Operação realizada com sucesso'
      : mensagem[0] ?? '';

    let toast = this.toastr.success(mens, titulo, config);
    if (toast && observer != null) {
      toast.onHidden.subscribe(observer);
    }
  }


  public error(throwError: any, titulo?: string, observer?: any, warning: boolean = false): void {

    titulo = titulo ?? "Erro";
    let toast: any;
    let message: any;

    if (throwError?.error?.errors != null) {
      message = throwError?.error?.errors.join();
    } else if (throwError?.error != null) {
      message = throwError?.error;
    } else if (!this.isNullObj(throwError)) {
      message = throwError;
    } else {
      message = "";
    }

    toast = warning ? this.toastr.warning(message, titulo) : this.toastr.error(message, titulo);

    if (toast && observer != null)
      toast.onHidden.subscribe(observer);

  }

  private isNullObj(throwError: any): boolean {
    return (throwError && Object.keys(throwError).length === 0 && throwError.constructor === Object)
  }




}

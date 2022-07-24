import { map } from 'rxjs/operators';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogo } from 'src/app/catalogo/models/catalogo';
import { CatalogoModeloFilter } from 'src/app/catalogo/models/catalogo-filtro';
import { ModeloService } from '../services/modelo.service';
import { environment } from 'src/environments/environment';
import { AgePipe } from 'src/app/app-core/pipes/age.pipe';
import { Modelo } from '../models/modelo';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { DatePipe } from '@angular/common';
import { DateUtils } from 'src/app/app-core/utils/date-utils';
import { Router } from '@angular/router';

declare function appUserList(data: any): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  modelFiltro: CatalogoModeloFilter = new CatalogoModeloFilter();
  models: any;
  pathImagensPerfil: string = environment.imagensPerfil;

  constructor(private route: Router,
    private service: ModeloService<Modelo>,
    private ngZone: NgZone,
    private toastr: ToastAppService
  ) { }
  ngOnInit(): void {
    this.service.listarTodos(this.modelFiltro)
      .pipe(map(response => {
        return response.map(item => ({
          'id': item.id,
          'nome_completo': item.nome,
          'email': item.email,
          'idade': new AgePipe().transform(item.dtNascimento),
          'municipio':  `${item.endereco.nomeMunicipio} - ${item.endereco.siglaUf}`,
          'situacao': item.idTipoSituacao,
          'situacaoNome': item.nomeTipoSituacao,
          'dthAtualizacao': DateUtils.Format(item.dthAtualizacao)   ,
          "avatar": this.pathImagensPerfil + item.imagemPerfilNome,
          'action': "",
        }));
      }))
      .subscribe(modeloss => {
        appUserList(modeloss);
      });

    (window as any)['angularComponentReference'] = {
      component: this, zone: this.ngZone,
        callNgDeleteModel: (valor: number, fncallbk: any) => this.deleteModel(valor, fncallbk),
        callNgNavegate : (url:string) => this.route.navigate([url])
    };

  }

  ngAfterViewInit(): void {

  }

  deleteModel(id: number, fncallbk: any) {
    let mens: string[] = ['Excluído com sucesso!'];

    const result = this.service.excluir(id)
      .subscribe(
        () => { this.toastr.success(mens); fncallbk(); },
        error => this.toastr.error(error)
      );
  }


}

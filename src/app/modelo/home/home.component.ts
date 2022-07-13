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

  constructor(
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
          'idade': + new AgePipe().transform(item.dtNascimento),
          'situacao': 1,
          'action': "",
          'email': item.nome,
          "avatar": this.pathImagensPerfil + item.imagemPerfilNome
        }));
      }))
      .subscribe(modeloss => {
        appUserList(modeloss);
      });

    // tslint:disable-next-line:use-life-cycle-interface
    (window as any)['angularComponentReference'] = {
      component: this, zone: this.ngZone,
      callNgDeleteModel: (valor: number, fncallbk: any) => this.deleteModel(valor, fncallbk)
    };

  }

  ngAfterViewInit(): void {
    let ob = [{
      'id': "1",
      'nome_completo': "Well",
      'idade': 99,
      'situacao': 1,
      'action': "",
      'email': "well.faustino",
      "avatar": "12.png"
    }
    ]
    // appUserList(ob);
  }

  deleteModel(id: number, fncallbk: any) {
    debugger;
    let mens: string[] = ['Excluído com sucesso!'];

    const result = this.service.excluir(id)
      .subscribe(
        () => { this.toastr.success(mens); fncallbk(); },
        error => this.toastr.error(error)
      );

  }
}

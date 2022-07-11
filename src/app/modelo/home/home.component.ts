import { map } from 'rxjs/operators';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogo } from 'src/app/catalogo/models/catalogo';
import { CatalogoModeloFilter } from 'src/app/catalogo/models/catalogo-filtro';
import { ModeloService } from '../services/modelo.service';
import { environment } from 'src/environments/environment';
import { AgePipe } from 'src/app/app-core/pipes/age.pipe';

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
    private service: ModeloService<Catalogo>
  ) { }

  ngOnInit(): void {
    this.service.listarTodos(this.modelFiltro)
      .pipe(map(response => {
        return response.map(item => ({
          'id': item.id,
          'nome_completo': item.nome,
          'idade': + new AgePipe().transform(item.dtNascimento) ,
          'situacao': 1,
          'action': "",
          'email': item.nome,
          "avatar": this.pathImagensPerfil + item.imagemPerfilNome
        }));
      }))
      .subscribe(modeloss => {
        console.log(modeloss);
        appUserList(modeloss);
      });
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

}

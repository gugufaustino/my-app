import { Observable } from 'rxjs';
import { CatalogoService } from './../services/catalogo.service';
import { Modelo } from './../models/modelo';
import { Component, OnInit } from '@angular/core';
import { ToastAppService } from 'src/app/services/toastapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  models : Observable<Modelo[]>;

  constructor(
    private toastr: ToastAppService,
    private service: CatalogoService<Modelo>
    ) { }

  ngOnInit(): void {
    this.models = this.service.listarTodos();
  }

}

import { CatalogoModeloFilter } from './../models/catalogo-filtro';
import { OptionSelect } from './../../app-core/models/option-select';
import { Observable } from 'rxjs';
import { CatalogoService } from './../services/catalogo.service';
import { Modelo } from '../../modelo/models/modelo';
import { Component, OnInit } from '@angular/core';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MASKS } from 'ng-brazil';
import { FormBaseComponent } from 'src/app/app-core/components/form-base.component';
import { environment } from 'src/environments/environment';
import { Catalogo } from '../models/catalogo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends FormBaseComponent implements OnInit {

  public componentRoute: string = '/models';
  MASKS: any = MASKS;
  modelFiltro: CatalogoModeloFilter = new CatalogoModeloFilter();
  models : Observable<Catalogo[]>;
  componentForm: FormGroup;
  controlsFormBase: any;
  tipoCasting: OptionSelect[] = Modelo.tipoCastingEnum;

  pathImagensPerfil: string = environment.imagensPerfil;

  constructor(
    protected formBuilder: FormBuilder,
    private toastr: ToastAppService,
    private service: CatalogoService<Catalogo>
    ) {
      super();

      this.controlsFormBase = {
        nome: ['',],
        idadeDe: ['',],
        idadeAte: ['',],
        alturaDe: ['',],
        alturaAte: ['',],
        pesoDe: ['',],
        pesoAte: ['',],
        tipoCasting: this.buildTipoCasting(),
      }
     }

  ngOnInit(): void {
    this.componentForm = this.formBuilder.group(this.controlsFormBase);
    this.models = this.service.listarTodos(this.modelFiltro);
  }

  getTipoCastingControls() {
    return this.componentForm.get('tipoCasting') ? (<FormArray>this.componentForm.get('tipoCasting')).controls : null;
  }


  buildTipoCasting() {
    return this.formBuilder.array(this.tipoCasting.map(v => new FormControl(false)));
  }

  submitForm(){
    this.modelFiltro = super.mapToModel(this.modelFiltro, this.componentForm.value);
    this.models = this.service.listarTodos(this.modelFiltro);
  }

  resetForm(){
    this.componentForm.reset();
    this.submitForm();
  }



}

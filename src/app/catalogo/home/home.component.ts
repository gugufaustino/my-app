import { OptionSelect } from './../../app-core/models/option-select';
import { Observable } from 'rxjs';
import { CatalogoService } from './../services/catalogo.service';
import { Modelo } from './../models/modelo';
import { Component, OnInit } from '@angular/core';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  models : Observable<Modelo[]>;
  componentForm: FormGroup;
  controlsFormBase: any;
  tipoCasting: OptionSelect[] = Modelo.tipoCastingEnum;

  constructor(
    protected formBuilder: FormBuilder,
    private toastr: ToastAppService,
    private service: CatalogoService<Modelo>
    ) {

      this.controlsFormBase = {
        nome: ['',],
        tipoCasting: this.buildTipoCasting(),

      }
     }

  ngOnInit(): void {
    this.componentForm = this.formBuilder.group(this.controlsFormBase);

    this.models = this.service.listarTodos();
  }

  getTipoCastingControls() {
    return this.componentForm.get('tipoCasting') ? (<FormArray>this.componentForm.get('tipoCasting')).controls : null;
  }


  buildTipoCasting() {
    return this.formBuilder.array(this.tipoCasting.map(v => new FormControl(false)));
  }

}

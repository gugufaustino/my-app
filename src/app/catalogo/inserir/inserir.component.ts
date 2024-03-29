import { CatalogoService } from './../services/catalogo.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';

import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrls: ['./inserir.component.css']
})
export class InserirComponent extends CatalogoBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private service: CatalogoService<Modelo>,
    private modal: NgbModal) {
    super(fb, modal);
  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  dateNow = new Date();

  ngOnInit(): void {
    this.componentForm = this.fb.group(this.controlsFormBase);
  }

  ngAfterViewInit(): void {
    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm);

  }


  submitForm(): void {

    super.validarFormulario(this.componentForm, true);
    if (this.componentForm.dirty && this.componentForm.valid) {
      this.model = super.mapToModel(this.model, this.componentForm.value)
      this.model.imagemPerfilUpload = this.croppedImage.split(',')[1];

      this.service.inserir(this.model)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => this.toastr.error(falha)
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];
    this.mudancasNaoSalvas = false;

    this.toastr.success(response.message, 'Sucesso!', () => {
      this.componentForm.reset();
      this.router.navigate(['/catalogo']);
    });
  }


  imageBase64: any;
  imagemPreview: any;

  // upload(file: any) {
  //   this.imagemNome = file[0].name;
  //   var reader = new FileReader();
  //   reader.onload = this.manipularReader.bind(this);
  //   reader.readAsBinaryString(file[0]);
  // }

  // manipularReader(readerEvt: any) {
  //   var binaryString = readerEvt.target.result;
  //   this.imageBase64 = btoa(binaryString);
  //   this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;
  // }




}


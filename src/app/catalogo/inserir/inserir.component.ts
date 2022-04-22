import { CatalogoService } from './../services/catalogo.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';

import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { Router } from '@angular/router';

import {ImageCroppedEvent, ImageTransform, Dimensions} from 'ngx-image-cropper'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal) {
    super(fb);
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;


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

  upload(file: any) {
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);


  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;

  }

  fileChangeEvent(event: any, content: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;

    const ngbModalOptions : NgbModalOptions = {
      size : 'lg',
      modalDialogClass : 'modal-fullscreen',
      windowClass : 'modalcropper',
      centered: true,

        };
    this.modalService.open(content, ngbModalOptions);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }



}


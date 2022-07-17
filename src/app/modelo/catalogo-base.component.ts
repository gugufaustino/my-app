import { ElementRef } from "@angular/core";

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { CustomValidators } from "ng2-validation";
import { Dimensions, ImageCroppedEvent, ImageTransform } from "ngx-image-cropper";

import { FormBaseComponent } from "../app-core/components/form-base.component";
import { OptionSelect } from "../app-core/models/option-select";
import { DateUtils } from "../app-core/utils/date-utils";
import { FormValidations } from "../app-core/utils/form-validations";
import { Modelo } from "./models/modelo";

export abstract class CatalogoBase extends FormBaseComponent {

  //MASKS: any = MASKS;
  DateMask = DateUtils.DataMask;
  DataDayMask = DateUtils.DataDayMask;

  componentForm: FormGroup;
  controlsFormBase: any;

  model: Modelo = new Modelo();
  tipoCastingEnum: OptionSelect[] = Modelo.tipoCastingEnum;
  corOlhosEnum: OptionSelect[] = Modelo.corOlhosEnum;
  corCabeloEnum: OptionSelect[] = Modelo.corCabeloEnum;

  tipoCabeloEnum: OptionSelect[] = Modelo.tipoCabeloEnum;
  tipoCabeloComprimentoEnum: OptionSelect[] = Modelo.tipoCabeloComprimentoEnum;


  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagemNome: string;

  constructor(
    protected formBuilder: FormBuilder,
    private modalService: NgbModal) {
    super();


    this.controlsFormBase = {
      nome: ['', [Validators.required, CustomValidators.rangeLength([3, 250])]],
      dtNascimento: ['', [Validators.required, FormValidations.data]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],

      diponibilidade: ['' ],
      modeloTipoCasting: this.buildTipoCasting(),

      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],
      telefone2: ['', [NgBrazilValidators.telefone]],

      instagram: ['', [Validators.required]],
      facebook: [''],
      linkedin: [''],

      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        logradouro: ['', [Validators.required, Validators.maxLength(250)]],
        numero: ['', [Validators.required, CustomValidators.number]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        siglaUf: ['', [Validators.required]],
        nomeMunicipio: ['', [Validators.required]],
      }),

      altura: ['', [Validators.required, CustomValidators.number]],
      peso: ['', [Validators.required, CustomValidators.number]],
      manequim: ['', [Validators.required, CustomValidators.number]],
      sapato: ['', [Validators.required, CustomValidators.number]],

      corOlhos: [null, [Validators.required]],
      corCabelo: [null, [Validators.required]],
      tipoCabelo: [null, [Validators.required]],
      tipoCabeloComprimento: [null, [Validators.required]],

      imagemPerfilNome: ['', [Validators.required]],

      //controles valor do inserir
      // situacao: ['ATIVADO'],
      // dthInclusao: [DateUtils.Format(new Date())],
      // dthAtualizacao: [''],

    };

    this.validationMessages = {
    }
  }

  buildTipoCasting() {
    return this.formBuilder
      .array(this.tipoCastingEnum.map(v => new FormControl(false)),
        FormValidations.requiredMinCheckbox(1));
  }

  getTipoCastingControls() {
    return this.componentForm.get('modeloTipoCasting') ? (<FormArray>this.componentForm.get('modeloTipoCasting')).controls : null;
  }


  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.componentForm);
  }

  protected configurarMensagensValidacaoBase() {
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }



  fileChangeEvent(event: any, content: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
    this.componentForm.get('imagemPerfilNome')?.setValue(event.currentTarget.files[0].name)

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
    //console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.componentForm.get('imagemPerfilNome')?.setValue('')
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }


}

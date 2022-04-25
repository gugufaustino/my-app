import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ImageTransform } from 'ngx-image-cropper';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['../inserir/inserir.component.css']
})
export class EditarComponent  extends CatalogoBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private service: CatalogoService<Modelo>,
    private modal: NgbModal) {
    super(fb, modal);

    this.model = Object.assign(this.model, this.route.snapshot.data["model"]);
    console.log(this.model)
  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  ngOnInit(): void {
    this.componentForm = this.fb.group(this.controlsFormBase);

    //Valores Default
    this.componentForm.patchValue({
       nome: this.model.nome,
       dtNascimento: this.model.dtNascimento,
       rg: this.model.rg,
       cpf: this.model.cpf,
       diponibilidade: this.model.diponibilidade,
       tipoCasting: this.model.nomeTipoCasting,

       email: this.model.email,
       telefone: this.model.telefone,
       instagram: this.model.instagram,
       facebook: this.model.facebook,
       linkedin: this.model.linkedin,

       altura: this.model.altura,
       peso: this.model.peso,
       manequim: this.model.manequim,
       sapato: this.model.sapato,

       corOlhos: this.model.corOlhos,
       corCabelo: this.model.corCabelo,
       tipoCabelo: this.model.tipoCabelo,
       tipoCabeloComprimento: this.model.tipoCabeloComprimento,

       imagemPerfilNome: this.model.imagemPerfilNome,


       endereco :  this.controlsFormBase.endereco.patchValue({
        cep: this.model.endereco.cep,
        logradouro: this.model.endereco.logradouro,
        numero: this.model.endereco.numero,
        complemento: this.model.endereco.complemento,
        bairro: this.model.endereco.bairro,
        siglaUf: this.model.endereco.siglaUf,
        nomeMunicipio: this.model.endereco.nomeMunicipio,
       }),

    });


    // this.componentForm.endereco = this.controlsFormBase.endereco.patchValue({
    //   cep: this.model.cep,
    //   logradouro: this.model.logradouro,
    //   numero: this.model.numero,
    //   complemento: this.model.complemento,
    //   bairro: this.model.bairro,
    //   siglaUf: this.model.siglaUf,
    //   nomeMunicipio: this.model.nomeMunicipio,
    //  }),

  }

  ngAfterViewInit(): void {

    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm)
  }

  submitForm(): void {

    super.validarFormulario(this.componentForm, true);
    if (this.componentForm.dirty && this.componentForm.valid) {
      this.model = super.mapToModel(this.model, this.componentForm.value)

      this.model.imagemPerfilNome = this.imagemNome;
      this.model.imagemPerfilUpload = this.croppedImage.split(',')[1];


      this.service.editar(this.model)
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


}

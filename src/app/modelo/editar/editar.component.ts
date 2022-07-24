import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncodePipe } from 'src/app/app-core/pipes/encode.pipe';
import { DateUtils } from 'src/app/app-core/utils/date-utils';
import { ToastAppService } from 'src/app/services/toastapp.service';
import { environment } from 'src/environments/environment';
import { CatalogoBase } from '../catalogo-base.component';
import { Modelo } from '../models/modelo';
import { ModeloService } from '../services/modelo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['../inserir/inserir.component.css']
})
export class EditarComponent extends CatalogoBase implements OnInit, AfterViewInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastAppService,
    private service: ModeloService<Modelo>,
    private modal: NgbModal) {
    super(fb, modal);

    this.model = Object.assign(this.model, this.route.snapshot.data["model"]);

  }

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  ngOnInit(): void {
    this.componentForm = this.fb.group(this.controlsFormBase);
    //Valores Default
    this.componentForm.patchValue({
      nome: this.model.nome,
      dtNascimento: DateUtils.Format(this.model.dtNascimento),
      rg: this.model.rg,
      cpf: this.model.cpf,
      diponibilidade: this.model.diponibilidade,
      modeloTipoCasting: this.tipoCastingEnum.map(x => this.model.modeloTipoCasting.indexOf(x.value) >= 0),

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
      dthAtualizacao: [DateUtils.Format(this.model.dthAtualizacao)],
      dthInclusao: [DateUtils.Format(this.model.dthInclusao)],

      endereco: this.controlsFormBase.endereco.patchValue({
        cep: this.model.endereco.cep,
        logradouro: this.model.endereco.logradouro,
        numero: this.model.endereco.numero,
        complemento: this.model.endereco.complemento,
        bairro: this.model.endereco.bairro,
        siglaUf: this.model.endereco.siglaUf,
        nomeMunicipio: this.model.endereco.nomeMunicipio,
      }),

      situacao: [this.model.nomeTipoSituacao],

    });
    this.imagemNome = this.model.imagemPerfilNome;
    this.croppedImage = environment.imagensPerfil + '/' + new EncodePipe().transform(this.model.imagemPerfilNome, 'URI');

  }

  ngAfterViewInit(): void {

    super.configurarMensagensValidacaoBase();
    super.configurarValidacaoFormularioBase(this.formInputElements, this.componentForm)
  }

  submitForm(): void {
    super.validarFormulario(this.componentForm, true);
    if ((this.componentForm.dirty || this.model.imagemPerfilNome != this.componentForm.get('imagemPerfilNome')?.value) && this.componentForm.valid) {

      if (this.model.imagemPerfilNome != this.componentForm.get('imagemPerfilNome')?.value) {
        this.model.imagemPerfilUpload = this.croppedImage.split(',')[1];
      }
      this.model = super.mapToModel(this.model, this.componentForm.value)

      this.service.editar(this.model)
        .subscribe(sucesso => this.processarSucesso(sucesso), falha => this.processarFalha(falha));
    }
  }


  processarSucesso(response: any) {
    super.processarSucessoBase();
    this.toastr.success(response.message, 'Salvo', () => {
      this.componentForm.reset();
      this.router.navigate(['/models']);
    });
  }

  processarFalha(fail: any) {
    super.processarFalha(fail);
    this.toastr.error("verifique os motivos listados abaixo.", "Falha ao salvar", null, this.validations?.length > 0);
  }

}

import { OptionSelect } from '../../app-core/models/option-select';
import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";
import { Endereco } from 'src/app/app-core/models/endereco';

export class Modelo implements MappingModel {
  constructor() { this.toMap(); }
  id: string;

  //campos controle
  dthInclusao: Date;
  dthAtualizacao: Date;
  usuarioInclusao: string
  usuarioAtualizacao: string

  nomeTipoSituacao: string;
  idTipoSituacao: number;
  //dados basicos
  nome: string;
  dtNascimento: Date;
  rg: string;
  cpf: string;

  //tipo de modelo
  diponibilidade: string;
  modeloTipoCasting: number[];

  //contato
  email: string;
  telefone: string;

  instagram: string;
  facebook: string;
  linkedin: string;

  endereco: Endereco

  //caracteristicas fisicas
  altura: number;
  peso: number;
  manequim: number;
  sapato: number;

  corOlhos: number;
  corCabelo: number;
  tipoCabelo: number;
  tipoCabeloComprimento: number;

  imagemPerfilUpload: string;
  imagemPerfilNome: string;

  // tipoPele: string;
  // medidaMascTorax: number;
  // medidaMascCamisa: number;
  // medidaMascTerno: number;
  // medidaFemQuadril: number;
  // medidaFemBusto: number;
  // medidaFemCintura: number;
  // cicatrizes: string;
  // piercing: string;
  // tatuagem: string;

  mappings: any[];
  toMap(): void {
    this.mappings = [
      {
        dtNascimento: "Date",
        dthInclusao: "Date",
        dthAtualizacao: "Date",
        modeloTipoCasting: "number[]",
        corOlhos: "number",
        corCabelo: "number",
        tipoCabelo: "number",
        tipoCabeloComprimento: "number",
      },

    ]
  }

  public static get tipoCastingEnum(): OptionSelect[] {
    return [
      new OptionSelect(1, 'Comercial'),
      new OptionSelect(2, 'Eventos'),
      new OptionSelect(3, 'Fashion'),
      new OptionSelect(4, 'Fashion Comercial'),
      new OptionSelect(5, 'Ator/Atriz'),

    ];
  }

  public static get corOlhosEnum(): OptionSelect[] {
    return [
      new OptionSelect(1, 'Azul'),
      new OptionSelect(2, 'Verde'),
      new OptionSelect(3, 'Castanho claro'),
      new OptionSelect(4, 'Castanho escuro'),
      new OptionSelect(5, 'Preto'),
    ]
  }

  public static get corCabeloEnum(): OptionSelect[] {
    return [
      new OptionSelect(1, 'Preto'),
      new OptionSelect(2, 'Castanho claro'),
      new OptionSelect(3, 'Castanho escuro'),
      new OptionSelect(4, 'Grisalho'),
      new OptionSelect(5, 'Loiro claro'),
      new OptionSelect(6, 'Loiro escuro'),
      new OptionSelect(7, 'Ruivo'),
      new OptionSelect(8, 'Mechas'),
      new OptionSelect(9, 'Colorido'),
    ]
  }

  public static get tipoCabeloEnum(): OptionSelect[] {
    return [
      new OptionSelect(1, 'Cacheado'),
      new OptionSelect(2, 'Liso'),
      new OptionSelect(3, 'Ondulado'),
      new OptionSelect(4, 'Crespo'),
    ]
  }

  public static get tipoCabeloComprimentoEnum(): OptionSelect[] {
    return [
      new OptionSelect(1, 'Raspado'),
      new OptionSelect(2, 'Curto'),
      new OptionSelect(3, 'Médio'),
      new OptionSelect(4, 'Longo'),
      new OptionSelect(5, 'Muito longo'),
    ]
  }

}

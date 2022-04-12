import { OptionSelect } from './../../app-core/models/option-select';
import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";

export class Modelo implements MappingModel {
  constructor() { this.toMap(); }
  id: string;

  //dados basicos
  nome: string;
  dtNascimento: Date;
  rg: string;
  cpf: string;

  //tipo de modelo
  diponibilidade: string;
  tipoCasting: Number[];

  //contato
  email: string;
  telefone: string

  instagram: string
  facebook: string
  linkedin: string

  //endereço
  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  siglaUf: string;
  nomeMunicipio: string;

  //caracteristicas fisicas
  altura: Number;
  peso: Number;
  manequim: Number;
  sapato: Number;

  corOlhos: Number;
  corCabelo: Number;
  tipoCabelo: Number;
  tipoCabeloComprimento: Number;
  tipoPele: string;
  medidaMascTorax: Number;
  medidaMascCamisa: Number;
  medidaMascTerno: Number;
  medidaFemQuadril: Number;
  medidaFemBusto: Number;
  medidaFemCintura: Number;
  cicatrizes: string;
  piercing: string;
  tatuagem: string;

  mappings: any[];
  toMap(): void {
    this.mappings = [
      {
        dtNascimento: "Date",
        tipoCasting: "number[]",
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

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

  corOlhos: Number[];
  corCabelo: Number[];
  tipoCabelo: Number[];
  tipoCabeloComprimento: Number[];
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


    ]
  }

  public static get tipoCastingEnum(): OptionSelect[] {
    return [
      new OptionSelect('comercial', 'Comercial'),
      new OptionSelect('eventos', 'Eventos'),
      new OptionSelect('fashion', 'Fashion'),
      new OptionSelect('fashioncomercial', 'Fashion Comercial'),
      new OptionSelect('atoratriz', 'Ator/Atriz'),

    ];
  }

  public static get corOlhosEnum(): OptionSelect[] {
    return [
      new OptionSelect('azul', 'Azul'),
      new OptionSelect('verde', 'Verde'),
      new OptionSelect('castanho claro', 'Castanho claro'),
      new OptionSelect('castanho escuro', 'Castanho escuro'),
      new OptionSelect('preto', 'Preto'),
    ]
  }

  public static get corCabeloEnum(): OptionSelect[] {
    return [
      new OptionSelect('preto', 'Preto'),
      new OptionSelect('castanho claro', 'Castanho claro'),
      new OptionSelect('castanho escuro', 'Castanho escuro'),
      new OptionSelect('grisalho', 'Grisalho'),
      new OptionSelect('loiro claro', 'Loiro claro'),
      new OptionSelect('loiro escuro', 'Loiro escuro'),
      new OptionSelect('ruivo', 'Ruivo'),
      new OptionSelect('mechas', 'Mechas'),
      new OptionSelect('colorido', 'Colorido'),
    ]
  }

  public static get tipoCabeloEnum(): OptionSelect[] {
    return [
      new OptionSelect('cacheado', 'Cacheado'),
      new OptionSelect('liso', 'Liso'),
      new OptionSelect('ondulado', 'Ondulado'),
      new OptionSelect('crespo', 'Crespo'),
    ]
  }

  public static get tipoCabeloComprimentoEnum(): OptionSelect[] {
    return [
      new OptionSelect('raspado', 'Raspado'),
      new OptionSelect('curto', 'Curto'),
      new OptionSelect('medio', 'Médio'),
      new OptionSelect('longo', 'Longo'),
      new OptionSelect('muito longo', 'Muito longo'),
    ]
  }

}

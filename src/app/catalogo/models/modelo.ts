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
    corOlhos : Number[];
    corCabelo : Number[];
    comprimentoCabelo : Number[];
    tipoCabelo : Number[];
    tipoPelo : Number[];
    medidaMascTorax :Number;
    medidaMascCamisa :Number;
    medidaMascTerno :Number;
    medidaFemQuadril :Number;
    medidaFemBusto :Number;
    medidaFemCintura :Number;

    mappings: any[];
    toMap(): void {
        this.mappings = [


        ]
    }

    public static get corOlhosEnum() : OptionSelect[]{
      return [
        new OptionSelect('azul', 'Azul'),
        new OptionSelect('verde' ,'Verde'),
        new OptionSelect('castanho claro' ,'Castanho claro'),
        new OptionSelect('castanho escuro' ,'Castanho escuro'),
        new OptionSelect('preto' ,'Preto'),
      ]
    }
    public static get corCabeloEnum() : OptionSelect[]{
      return [
        new OptionSelect('Preto', 'Preto'),
        new OptionSelect('Castanho claro', 'Castanho claro'),
        new OptionSelect('Castanho escuro', 'Castanho escuro'),
        new OptionSelect('Grisalho', 'Grisalho'),
        new OptionSelect('Loiro claro', 'Loiro claro'),
        new OptionSelect('Loiro escuro', 'Loiro escuro'),
        new OptionSelect('Ruivo', 'Ruivo'),
        new OptionSelect('Mechas', 'Mechas'),
        new OptionSelect('Colorido', 'Colorido'),
      ]
    }

    public static get tipoCastingEnum() : OptionSelect[]{
      return [
        new OptionSelect('comercial', 'Comercial'),
        new OptionSelect('eventos', 'Eventos'),
        new OptionSelect('fashion', 'Fashion'),
        new OptionSelect('fashioncomercial', 'Fashion Comercial'),
        new OptionSelect('atoratriz', 'Ator/Atriz'),

      ];
    }

    public static get tipoCabeloEnum() : OptionSelect[]{
      return [
        new OptionSelect('cacheado', 'Cacheado'),
        new OptionSelect('liso', 'Liso'),
        new OptionSelect('ondulado', 'Ondulado'),
        new OptionSelect('crespo', 'Crespo'),
      ]
    }


}

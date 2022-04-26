import { OptionSelect } from '../../app-core/models/option-select';
import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";

export class Catalogo implements MappingModel {
  constructor() { this.toMap(); }
  id: string;
  //dados basicos
  nome: string;
  dtNascimento: Date;

  //tipo de modelo
  diponibilidade: string;
  nomeTipoCasting : string[];


  instagram: string;
  facebook: string;
  linkedin: string;

  //caracteristicas fisicas
  altura: number;
  peso: number;

  imagemPerfilNome: string;

  nomeCorOlhos: string;
  nomeCorCabelo: string;
  nomeTipoCabelo: string;
  nomeTipoCabeloComprimento: string;

  mappings: any[];
  toMap(): void {
    this.mappings = [
      {
        dtNascimento: "Date",
        modeloTipoCasting: "number[]",
        corOlhos: "number",
        corCabelo: "number",
        tipoCabelo: "number",
        tipoCabeloComprimento: "number",
      },

    ]
  }
}

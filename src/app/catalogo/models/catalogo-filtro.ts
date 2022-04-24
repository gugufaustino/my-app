import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";

export class CatalogoModeloFilter implements MappingModel {
  constructor() { this.toMap(); }
  nome:string;

  idadeDe:number;
  idadeAte:number;

  alturaDe:number;
  alturaAte:number;

  pesoDe:number;
  pesoAte:number;

  tipoCasting: number[];

  mappings: any[];
  toMap(): void {
    this.mappings = [
      {
        alturaInicio: "number",
        alturaFim: "number",
        pesoInicio: "number",
        pesoFim: "number",
        tipoCasting: "number[]",
      },

    ]
  }
}

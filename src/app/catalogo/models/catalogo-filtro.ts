import { MappingModel } from "src/app/app-core/interfaces/models/mapping.model";

export class CatalogoFiltro implements MappingModel {
  constructor() { this.toMap(); }
  nome:string;

  idadeInicio:Number;
  idadeFim:Number;

  alturaInicio:Number;
  alturaFim:Number;

  pesoInicio:Number;
  pesoFim:Number;

  tipoCasting: Number[];

  mappings: any[];
  toMap(): void {
    this.mappings = [
      {
        alturaInicio: "number",
        alturaFim: "number",

        // pesoInicio: "number",
        // pesoFim: "number",

        tipoCasting: "number[]",
      },

    ]
  }
}

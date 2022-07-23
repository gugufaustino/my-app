import { MappingModel } from "../interfaces/models/mapping.model";

export class Endereco implements MappingModel {
  constructor() { this.toMap(); }
  mappings: any[];
  toMap(): void {
    this.mappings = [
      {
        numero: "number",
        latitude: "number",
        longitude: "number"
      }
    ]
  }

  cep: string;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  nomeMunicipio: string;
  siglaUf: string;
  latitude: number;
  longitude: number;

}


import { ClienteInterface } from '../interface/interface.index';
/**
* Representa un cliente
* @class Cliente
*/
export class Cliente implements ClienteInterface{
  public email:number;
  public tipoDocumento:string;
  public numeroDocumento:string;
  public nombres:string;
  public primerApellido:string;
  public segundoApellido:string;
  public telefono:string;
  public fechaNacimiento:Date;
  public sexo:string
}

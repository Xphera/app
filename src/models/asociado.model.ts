import { AsociadoInterface } from '../interface/interface.index';

/**
* Representa una asociado
* @class Categoria
*/
export class Asociado implements AsociadoInterface {
  id: number;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  titulo: string;
  imagePath: string;
  perfil: string;
  calificacion: number;
  insignia: string;
  servicios: Array<number>;
  paquetes: Array<number>;
  nombreCompleto:string;
  // TODO: inluir en interface
  zona:any
  // nombreCompleto():string{
  //   return  this.nombres + ' ' + this.primerApellido + ' ' + this.segundoApellido;
  // }
}

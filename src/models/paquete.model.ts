import { PaqueteInterface } from '../interface/interface.index';

/**
* Representa una asociado
* @class Paquete
*/
export class Paquete implements PaqueteInterface {
  id: number;
  servicio: string;
  prestador: number;
  prestadorId:number;
  idRelacionPrestadorPaquete:number;
  nombre: string;
  detalle: string;
  cantidadDeSesiones: string;
  valor:number;
  sesiones:Array<{ubicacion:string,fecha:string}>
}

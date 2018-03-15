import { PaqueteInterface } from '../interface/interface.index';

/**
* Representa una asociado
* @class Categoria
*/
export class Paquete implements PaqueteInterface {
  id: number;
  servicio: string;
  prestador: number;
  nombre: string;
  detalle: string;
  cantidadDeSesiones: string;
  sesiones:Array<{ubicacion:string,fecha:string}>
}

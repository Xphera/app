import { PaqueteActivoInterface } from '../interface/interface.index';
import {Asociado} from './models.index';

/**
* Representa un paquete activo
* @class PaqueteActivo
*/
export class PaqueteActivo implements PaqueteActivoInterface {
  id: number;
  servicio: string;
  prestador: Asociado = new Asociado();
  nombre: string;
  detalle: string;
  cantidadDeSesiones: string;
  valor:number;
  sesionAgendadas:number;
  sesionFinalizadas:number;
  sesionPorAgendadar:number;
  compradetallesesiones:Array<{
                                  calificacion:number,
                                  complemento:string,
                                  direccion:string,
                                  latitud:number,
                                  longitud:number,
                                  titulo:number
                                  fecha:string,
                                  id:number
                                  estado:{
                                    estado:string,
                                    id:number
                                  }
                                }>
}

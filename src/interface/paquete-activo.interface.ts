import { AsociadoInterface } from './asociado.interface';
export interface PaqueteActivoInterface{
  id:number,
  servicio:string,
  nombre:string,
  detalle:string,
  cantidadDeSesiones:string,
  valor:number,
  sesionAgendadas:number,
  sesionFinalizadas:number,
  sesionPorAgendadar:number,
  prestador:AsociadoInterface
}

import {AsociadoInterface} from './asociado.interface';
import {UbicacionInterface} from './ubicacion.interface';
export interface SesionInterface{
  sesionId:number,
  fechaInicio:string,
  prestador:AsociadoInterface,
  calificacion:number,
  ubicacion:UbicacionInterface
  // estadoId:number
  // estadoNombre:string
}

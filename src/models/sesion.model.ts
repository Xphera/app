import { SesionInterface } from '../interface/interface.index';
import { Asociado, Ubicacion, EstadoSesion,Paquete } from './models.index';

export class Sesion implements SesionInterface {
  public sesionId: number;
  public fechaInicio: string;
  public prestador: Asociado = new Asociado();
  public calificacion: number
  public ubicacion: Ubicacion = new Ubicacion()
  public estado: EstadoSesion = new EstadoSesion();
  public paquete: Paquete = new Paquete()
  public inicio: string;
  public fin: string;
  public duracion:number
  // public estadoId:number
  // public estadoNombre:string

}

import { SesionInterface } from '../interface/interface.index';
import {Asociado,Ubicacion} from './models.index';
export class Sesion implements SesionInterface{
  public sesionId:number;
  public fechaInicio:string;
  public prestador:Asociado = new Asociado();
  public calificacion:number
  public ubicacion:Ubicacion = new Ubicacion()
  public estadoId:number
  public estadoNombre:string
}

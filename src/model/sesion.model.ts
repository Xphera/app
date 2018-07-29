import { Ubicacion,EstadoSesion,Paquete,Cliente } from './models.index';

export class Sesion {
  public sesionId: number;
  public fechaInicio: string;
  public cliente: Cliente = new Cliente();
  public calificacion: number
  public ubicacion: Ubicacion = new Ubicacion()
  public estado: EstadoSesion = new EstadoSesion();
  public paquete: Paquete = new Paquete()
  public inicio: string;
  public fin: string;
  public duracion: number
}

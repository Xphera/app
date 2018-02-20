import { ServicioInterface } from '../interfaces/interfaces.index';
/**
* Representa una categoria de servicios.
* @class Categoria
*/
export class Servicio implements ServicioInterface{
  public id:number;
  public categoria:number;
  public nombre:string;
  public imagePath:string;
  public detalle:string;
}

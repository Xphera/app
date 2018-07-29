import { UbicacionInterface } from '../interface/interface.index';
/**
* Representa una categoria de servicios.
* @class Ubicacion
*/
export class Ubicacion implements UbicacionInterface{
  public id:number;
  public cliente:number;
  public title:string;
  public direccion:string;
  public latitud:number;
  public longitud:number;
  public imgPath:string;
  public complemento:string
  public index:number;
}

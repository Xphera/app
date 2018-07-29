import { CategoriaInterface } from '../interface/interface.index';
/**
* Representa una categoria de servicios.
* @class Categoria
*/
export class Categoria implements CategoriaInterface{
  public id:number;
  public nombre:string;
  public imagePath:string;
  public detalle:string;
  public servicios:any[];
}

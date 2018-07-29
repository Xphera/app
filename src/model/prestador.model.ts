import {Paquete} from './models.index';

export class Pestador {
  id: number;
  nombreCompleto: string;
  primerApellido:string;
  segundoApellido:string;
  tipoDocumento:string;
  numeroDocumento:string;
  telefono:string;
  email:string;
  direccion:string;
  municipio:{
    id:number
    nombre:string
  };
  fechaNacimiento:string;
  perfil:string;
  calificacion:string;
  imagePath:string;
  nombres:string;
  insignia:string;
  paquetes:Array<Paquete>;
  comentarios:Array<{
    id:number;
    calificacion:number;
    paquete:string;
    comentario:string;
    imagePath:string;
    cliente:string
  }>;
  formacion:Array<{
    titulo:string;
    institucion:string;
    year:number
  }>;
  zona:any
}

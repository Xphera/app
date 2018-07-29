export interface AsociadoInterface{
  id:number,
  primerApellido:string,
  segundoApellido:string,
  nombres:string,
  titulo:string,
  imagePath:string,
  perfil:string,
  calificacion:number,
  insignia:string,
  servicios:Array<number>,
  paquetes:Array<number>
  nombreCompleto:string
}

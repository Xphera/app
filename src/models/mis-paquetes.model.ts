
export class MisPaquetes {
  'id': number;
  'paquete': string;
  'detalle': string;
  'prestador': {
    'nombreCompleto': string,
    'imagePath': string,
  }
  'valor': number;
  'sesiones': number;
  'estado': {
    'id': number,
    'estado': string;
  }
}

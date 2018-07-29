
export class  Bolsa  {
  saldo: number;
  movimientos:
    [{
      tipo: string,
      id: number,
      descripcion: string,
      created: Date
    }]
}

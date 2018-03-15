import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { Paquete } from '../../models/models.index';

/*
  Generated class for the AgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendaProvider {

  public porAgendar: Paquete = new Paquete();

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvdr: AlmacenamientoProvider) {
    console.log('Hello AgendaProvider Provider');
  }

  agendar(paquete: Paquete): void {
    this._almacenamientoPrvdr.guardar('agendar', JSON.stringify(paquete));
  }

  obtenerPorAgendar() {
    this._almacenamientoPrvdr.obtener('agendar').then((datos: { satatus: string, data: string }) => {
      this.porAgendar = JSON.parse(datos.data);
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { TarjetaCredito } from '../../models/models.index';

/*
  Generated class for the MetodoPagoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MetodoPagoProvider {

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvdr: AlmacenamientoProvider
  ) {
    console.log('Hello MetodoPagoProvider Provider');
  }

  guardarTarjetaCredito(tarjeta:TarjetaCredito) {
      this._almacenamientoPrvdr.guardar('tarjetaCredito',JSON.stringify(tarjeta));
  }

}

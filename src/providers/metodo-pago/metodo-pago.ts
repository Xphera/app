import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { PeticionProvider } from '../peticion/peticion';

import { TarjetaCredito } from '../../models/models.index';

import { URL_TARJETAS_CREDITO } from '../../config/url.confing';

import { Observable } from "rxjs/Observable"



/*
  Generated class for the MetodoPagoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MetodoPagoProvider {
  public td: Array<TarjetaCredito> = new Array<TarjetaCredito>();

  constructor(
    private http: HttpClient,
    private _autenticacionPrvdr: AutenticacionProvider,
    private _peticionPrvdr: PeticionProvider
  ) {
    console.log('Hello MetodoPagoProvider Provider');
  }

  guardarTarjetaCredito(tarjeta) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let observable = new Observable((observer) => {
      let request = this.http.post(URL_TARJETAS_CREDITO, tarjeta, { headers })
      this._peticionPrvdr.peticion(request)
        .subscribe((resp) => {
          if (resp['estado'] == "ok") {
            this.obtenerTarjetasCredito();
            observer.next(true);
          }
        },
          (error) => {
            observer.error(error);
          })
    })
    return observable
  }

  obtenerTarjetasCredito() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get<TarjetaCredito[]>(URL_TARJETAS_CREDITO, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp: TarjetaCredito[]) => {
        this.td = resp
      })
  }

  eliminarTarjeta(token: string) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let observable = new Observable((observer) => {
      let request = this.http.delete(URL_TARJETAS_CREDITO + token, { headers })
      this._peticionPrvdr.peticion(request).subscribe((resp) => {
        if (resp['estado'] == "ok") {
          this.obtenerTarjetasCredito()
          observer.next(true);
        }
      },
        (error) => {
          observer.error(error);
        })
    })
    return observable
  }



}

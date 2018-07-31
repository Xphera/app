import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PeticionProvider } from '../peticion/peticion';

import { TarjetaCredito } from '../../models/models.index';

import { URL_TARJETAS_CREDITO, URL_TARJETAS_CREDITO_PRINCIPAL } from '../../config/url.confing';

import { Observable } from "rxjs/Observable"
import { Subject } from 'rxjs/Subject';




/*
  Generated class for the MetodoPagoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MetodoPagoProvider {
  public td: Array<TarjetaCredito> = Array<TarjetaCredito>();
  public tcPrincipal = new Subject();


  constructor(
    private http: HttpClient,
    private _peticionPrvdr: PeticionProvider
  ) {
    console.log('Hello MetodoPagoProvider Provider');
  }

  guardarTarjetaCredito(tarjeta) {
    let headers = this._peticionPrvdr.getHeaders();
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
    this.tcPrincipal = new Subject();
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get<TarjetaCredito[]>(URL_TARJETAS_CREDITO, { headers })
    this.td = Array<TarjetaCredito>()


    this._peticionPrvdr.peticion(request)
      .subscribe((resp: TarjetaCredito[]) => {
        this.td = resp
        // ubicar tarjeta principal....
        let principal: TarjetaCredito = this.td
          .find((data: TarjetaCredito) => {
            return data.principal
          })

        if (principal != undefined)
          this.tcPrincipal.next(principal)
      })
  }



  eliminarTarjeta(token: string) {
    let headers = this._peticionPrvdr.getHeaders();
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

  public tarjetaCreditoPrincipal(creditCardTokenId: string) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post(URL_TARJETAS_CREDITO_PRINCIPAL, { creditCardTokenId: creditCardTokenId }, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp) => {
        if (resp['estado'] == "ok") {
          this.obtenerTarjetasCredito();
        }
      })
  }

}

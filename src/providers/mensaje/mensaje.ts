import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeticionProvider } from '../peticion/peticion';
import {
  URL_CHAT
} from '../../config/url.confing';

import { Subject } from 'rxjs/Subject';
/*

/*
  Generated class for the MensajeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensajeProvider {

  public mensajeSubject = new Subject();

  constructor(public http: HttpClient,
      private _peticionPrvdr:PeticionProvider) {
    console.log('Hello MensajeProvider Provider');
  }

  public obtenerMensaje(compraDetalleId){
    let headers = this._peticionPrvdr.getHeaders();
    let request= this.http.get(URL_CHAT,{params:{compraDetalleId:compraDetalleId}, headers:headers })
    return this._peticionPrvdr.peticion(request)
  }

  public enviarMensaje(compraDetalleId,mensaje){
    let headers = this._peticionPrvdr.getHeaders();
    let request=  this.http.post(URL_CHAT,{compraDetalleId,mensaje},{ headers })
    return this._peticionPrvdr.peticion(request)
  }

  public nuevoMensaje(data){
    this.mensajeSubject.next(data)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  URL_ZONA
} from '../../config/url.config';
import { PeticionProvider } from '../peticion/peticion';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
/*
  Generated class for the ZonaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ZonaProvider {

  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider,
    private _autenticacionPrvdr:AutenticacionProvider) {
    console.log('Hello ZonaProvider Provider');
  }


  obtenerZona() {
    let headers = this._peticionPrvdr.getHeaders();
    let request =  this.http.get(URL_ZONA, { headers })
    return this._peticionPrvdr.peticion({ request: request})
  }




}

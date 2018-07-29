import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeticionProvider } from '../peticion/peticion';
import {
  URL_DISPONIBILIDAD
} from '../../config/url.config';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
/*
  Generated class for the DisponibilidadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DisponibilidadProvider {

  public disponibiliad: Array<any>;

  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider,
    private _autenticacionPrvdr:AutenticacionProvider) {
    console.log('Hello DisponibilidadProvider Provider');
  }

  enviarDisponibiliad(disponibilidad: any) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post(URL_DISPONIBILIDAD, {disponibilidad},{ headers })
    return this._peticionPrvdr.peticion({ request: request })

  }

  obtenerDisponibiliad() {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get(URL_DISPONIBILIDAD,{ headers })
    this._peticionPrvdr.peticion({ request: request })
      .subscribe(
        (resp: Array<any>) => {
          this.disponibiliad = resp
        })
  }

}

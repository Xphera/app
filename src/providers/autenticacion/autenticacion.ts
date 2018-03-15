import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_LOGIN } from '../../config/url.confing';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';

import 'rxjs/add/operator/map';

/*
  Generated class for the AutenticacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacionProvider {

  protected token: string;

  constructor(
    private http: HttpClient,
    private _almacenamientoPrvdr: AlmacenamientoProvider
  ) {
    console.log('Hello AutenticacionProvider Provider');
    this.cargarToken();
  }

  public obetenetToken(): string {
    return this.token;
  }

  protected cargarToken(): void {
    this._almacenamientoPrvdr.obtener('token')
      .then((almacenamiento: any) => {
        this.token = almacenamiento.data;
      }
      )
  }

  public activo() {
    //return this._almacenamientoPrvdr.obtener('token');
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  public login(username: string, password: string) {
    return this.http.post(BASE_URL_LOGIN, { username, password })
      .map(
        (respuesta: any) => {
          this.token = respuesta.token;
          this._almacenamientoPrvdr.guardar('token', respuesta.token)
        },
    );
  }

  public cerrarSesion() {
    this.token = null;
    this._almacenamientoPrvdr.eliminar('token');
  }


  public gerHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Token ' + this.token
    });
    console.log(headers, this.token);
    return headers;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuController, App } from 'ionic-angular';

import { URL_LOGIN } from '../../config/url.confing';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';

import 'rxjs/add/operator/map';

/*
  Generated class for the AutenticacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacionProvider {

  protected token: string;
  key: string

  constructor(
    private http: HttpClient,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider,
    private menuCtrl: MenuController,
    public app: App) {

    console.log('Hello AutenticacionProvider Provider');
    this.cargarToken();
    // this.cargaMenu();
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
    return this._almacenamientoPrvdr.obtener('token');
    // if (this.token) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  public login(username: string, password: string) {
    let request = this.http.post(URL_LOGIN, { username, password })
    return this._peticionPrvdr.peticion(request, this.key)
      .map(
        (respuesta: any) => {
          this.guardarToken(respuesta.token)
        },
    );

    // return this.http.post(BASE_URL_LOGIN, { username, password })
    //   .map(
    //     (respuesta: any) => {
    //       // this.token = respuesta.token;
    //       // this._almacenamientoPrvdr.guardar('token', respuesta.token)
    //       this.guardarToken(respuesta.token)
    //     },
    // );
  }

  public cerrarSesion() {
    this.token = null;
    let promesa = new Promise((resolve, reject) => {
      this._almacenamientoPrvdr.eliminar('token')
        .then(() => {
          this.cargaMenu()
            .then((resp) => {
              resolve(resp);
            })
        })

    })
    return promesa;
  }

  public guardarToken(token: string) {
    this.token = token;
    this._almacenamientoPrvdr.guardar('token', token)
  }


  public gerHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Token ' + this.token
    });
    console.log(headers, this.token);
    return headers;
  }

  cargaMenu() {

    let promesa = new Promise((resolve, reject) => {
      this._almacenamientoPrvdr.obtener('token')
        .then((data) => {
          let pagina: string

          if (data['data'] != null) {
            this.menuCtrl.enable(false, 'sesionInactiva');
            this.menuCtrl.enable(true, 'sesionActiva');
            pagina = "HomeUsuarioPage"
          } else {
            this.menuCtrl.enable(true, 'sesionInactiva');
            this.menuCtrl.enable(false, 'sesionActiva');
            pagina = "HomePage"
          }
          resolve(pagina);
        }).catch(() => {
          this.menuCtrl.enable(true, 'sesionInactiva');
          this.menuCtrl.enable(false, 'sesionActiva');
          resolve("HomePage");
        })
    })
    return promesa;
  }

}

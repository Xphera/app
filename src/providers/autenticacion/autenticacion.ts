import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuController, App } from 'ionic-angular';

import { URL_LOGIN } from '../../config/url.confing';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { IonicComponentProvider } from '../ionic-component/ionic-component';
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
    public _ionicComponentPrvdr: IonicComponentProvider,
    public app: App) {

    console.log('Hello AutenticacionProvider Provider');
    this.cargarToken();
    // this.cargaMenu();
  }


  public obetenetToken(): string {
    return this.token;
  }

  protected cargarToken(): void {
    this._almacenamientoPrvdr.obtener('usuario')
      .then((almacenamiento: any) => {
        if (almacenamiento.data !== null) {
          let data = JSON.parse(almacenamiento.data)
          this.token = data.token;
        }
      }
      )
  }

  public activo() {
    return this._almacenamientoPrvdr.obtener('usuario');
  }

  public login(username: string, password: string) {
    let request = this.http.post(URL_LOGIN, { username, password })
    return this._peticionPrvdr.peticion(request, this.key)
      .map(
        (respuesta: any) => {
          this.guardarUsuario(respuesta)
        },
    );
  }

  public cerrarSesion() {
    this.token = null;
    let promesa = new Promise((resolve, reject) => {
      this._almacenamientoPrvdr.eliminar('usuario')
        .then(() => {
          this.cargaMenu()
            .then((resp) => {
              resolve(resp);
            })
        })

    })
    return promesa;
  }

  public guardarUsuario(usuario) {
    this.token = usuario.token;
    this._almacenamientoPrvdr.guardar('usuario', JSON.stringify(usuario))
  }

  public gerHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Token ' + this.token
    });
    // console.log(headers, this.token);
    return headers;
  }

  cargaMenu() {

    let promesa = new Promise((resolve, reject) => {
      this.activo()
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

  public guardian(pagina, param) {
    return new Promise((resolve, reject) => {
      this.activo()
        .then((data) => {
          if (data['data'] == null) {
            setTimeout(() => {
              this.app.getActiveNavs()[0].push('LoginPage');
              this._ionicComponentPrvdr.showLongToastMessage("para continuar inicia sesión")

              let data = {
                'pagina': pagina,
                'param': param
              }
              this._almacenamientoPrvdr.guardar('ir', JSON.stringify(data))
            }, 0);
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch(() => {
          setTimeout(() => {
            this.app.getActiveNavs()[0].push('LoginPage');
            this._ionicComponentPrvdr.showLongToastMessage("para continuar inicia sesión")
          }, 0);
          resolve(false);
        });
    })


  }



}

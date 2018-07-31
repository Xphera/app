import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuController, App } from 'ionic-angular';

import { URL_LOGIN,RESTABLECER_PASSWORD,URL_REGISTRO_USUARIO,URL_ACTIVAR_USUARIO } from '../../config/url.confing';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { IonicComponentProvider } from '../ionic-component/ionic-component';
import 'rxjs/add/operator/map';
import { PushNotificationProvider } from '../push-notification/push-notification';

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
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider,
    private menuCtrl: MenuController,
    public _ionicComponentPrvdr: IonicComponentProvider,
    public _pushNotificationPrvdr:PushNotificationProvider,
    public app: App) {

    console.log('Hello AutenticacionProvider Provider');
    this.cargarToken();
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

  protected crearSesion(resp){
    this._almacenamientoPrvdr.eliminar('restablcerUsuario')
    this.guardarUsuario(resp)
    this._pushNotificationPrvdr.addtagsNotificacion({ "userId": resp["user_id"] })
    // inicializar Token
    this._peticionPrvdr.cargarToken()
    this.cargaMenu()
      .then((resp: string) => {
        this.app.getRootNavs()[0].setRoot(resp)
        this._almacenamientoPrvdr.obtener('ir')
          .then((data) => {
            if (data["data"] != null) {
              data = JSON.parse(data["data"])
              this.app.getRootNavs()[0].push(data["pagina"], data["param"]);
              this._almacenamientoPrvdr.eliminar('ir')
            }
          })
      })
  }

  public obetenetToken(): string {
    return this.token;
  }

  public activo() {
    return this._almacenamientoPrvdr.obtener('usuario');
  }

  public login(username: string, password: string) {
    let request = this.http.post(URL_LOGIN, { username, password })
     this._peticionPrvdr.peticion(request)
      .subscribe((resp)=>{
       this.crearSesion(resp)
     })
  }

  public cerrarSesion() {
    this.token = null;
    this._pushNotificationPrvdr.deletetagsNotificacion("userId")
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

  // public gerHeaders(): HttpHeaders {
  //   let headers = new HttpHeaders({
  //     'Authorization': 'Token ' + this.token
  //   });
  //   // console.log(headers, this.token);
  //   return headers;
  // }

  public cargaMenu() {

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

  public restablecerPasswordUsuario(usuario){
    let request = this.http.post(RESTABLECER_PASSWORD, { usuario })
    let promesa = new Promise((resolve, reject) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data) => {
          this._almacenamientoPrvdr.guardar('restablcerUsuario', usuario)
            .then(() => {
              this._ionicComponentPrvdr.showLongToastMessage('Se ha enviado correo electrónico con código para continuar con proceso.')
              resolve(true);
            })
        })
    })
    return promesa;
  }

  public restablecerPasswordCodigo(data){
    let request = this.http.put(RESTABLECER_PASSWORD, data)
      this._peticionPrvdr.peticion(request)
        .subscribe((resp) => {
          this._almacenamientoPrvdr.eliminar('restablcerUsuario')
          this.crearSesion(resp)
    })

  }

  public crearUsario(email: string, passw: string, repassw: string) {
    let request = this.http.post(URL_REGISTRO_USUARIO, { email, passw, repassw })
    let promesa = new Promise((resolve, reject) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data) => {
          //guardar infomarmacion de registroUsuario.
          this._almacenamientoPrvdr.guardar('registroUsuario', email)
            .then(() => {
              this._ionicComponentPrvdr.showLongToastMessage('Cuenta creada, se ha enviado correo electrónico con código para activar cuenta.')
              resolve(true);
            })
        })
    })
    return promesa;
  }

  public activarCuenta(email: string, codigoValidacion: string) {

    let request = this.http.post(URL_ACTIVAR_USUARIO, { email, codigoValidacion })
      this._peticionPrvdr.peticion(request)
        .subscribe((resp) => {
          this._almacenamientoPrvdr.eliminar('registroUsuario')
          this._ionicComponentPrvdr.showLongToastMessage('Cuenta activada con éxito.')
          this.crearSesion(resp)
        })

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

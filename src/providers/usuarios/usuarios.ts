import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { IonicComponentProvider } from '../ionic-component/ionic-component';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { Observable } from "rxjs/Observable"
import {
  URL_REGISTRO_USUARIO,
  URL_ACTIVAR_USUARIO,
  URL_PAGAR,
  URL_MIS_PAQUETES
} from '../../config/url.confing';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  public ubicaciones: any[] = [];
  public infoRegistro: string;
  public key: string = ''
  public misPaquetes

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    public _autenticacionPrvdr: AutenticacionProvider,
  ) {
    console.log('Hello UsuariosProvider Provider');
  }

  //
  obtenerUbicaciones() {
    this.ubicaciones = [
      {
        titulo: 'Parque urbano el Virrey',
        latitud: 4.67424,
        longitud: -74.0563
      },
      {
        titulo: 'Parque Simón Bolívar',
        latitud: 4.6586709,
        longitud: -74.0939604,
      },
      {
        titulo: 'Parque Nacional',
        latitud: 4.6241379,
        longitud: -74.0651253,
      }
    ]

  }

  activarCuenta(email: string, codigoValidacion: string) {

    let request = this.http.post(URL_ACTIVAR_USUARIO, { email, codigoValidacion })
    let promesa = new Promise((resolve, reject) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data) => {
          this._almacenamientoPrvdr.eliminar(this.key)
            .then(() => {
              this._ionicComponentPrvdr.showLongToastMessage('Cuenta activada con éxito.')
              resolve(true);
            })
        })
    })
    return promesa;
  }

  crearUsario(email: string, passw: string, repassw: string) {
    let request = this.http.post(URL_REGISTRO_USUARIO, { email, passw, repassw })
    let promesa = new Promise((resolve, reject) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data) => {
          //guardar infomarmacion de registroUsuario.
          this._almacenamientoPrvdr.guardar(this.key, email)
            .then(() => {
              this._ionicComponentPrvdr.showLongToastMessage('Cuenta creada, se ha enviado correo electrónico con código para activar cuenta.')
              resolve(true);
            })
        })
    })
    return promesa;
  }

  public datosRegistro() {
    this._almacenamientoPrvdr.obtener(this.key).then(
      (respuesta: any) => {
        this.infoRegistro = respuesta.data;
      }
    );
  }


  public pagar(datos) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post(URL_PAGAR, datos, { headers })
    let observable = new Observable((observer) => {
        this._peticionPrvdr.peticion(request)
        .subscribe((resp)=>{
            if(resp['error']== false){
                this._ionicComponentPrvdr.showLongToastMessage('Pago realizado.')
                observer.next(true);
            }else{
              console.log('paso algo')
            }
        })
    })
    return observable
  }

  public obtenerMisPaquetes() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get(URL_MIS_PAQUETES, { headers })
    this._peticionPrvdr.peticion(request)
    .subscribe((resp)=>{
      console.log(resp)
      this.misPaquetes = resp
    })


    let observable = new Observable((observer) => {
        this._peticionPrvdr.peticion(request)
        .subscribe((resp)=>{
            if(resp['error']== false){
                this._ionicComponentPrvdr.showLongToastMessage('Pago realizado.')
                observer.next(true);
            }else{
              console.log('paso algo')
            }
        })
    })
    return observable
  }


}

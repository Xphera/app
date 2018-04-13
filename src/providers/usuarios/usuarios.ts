import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { IonicComponentProvider } from '../ionic-component/ionic-component';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { Observable } from "rxjs/Observable"

import { PaqueteActivo, Cliente, Sesion } from '../../models/models.index';

import {
  URL_REGISTRO_USUARIO,
  URL_ACTIVAR_USUARIO,
  URL_PAGAR,
  URL_MIS_PAQUETES,
  URL_PAQUETE_ACTIVO,
  URL_CALIFICAR_SESION,
  URL_PROXIMA_SESION
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
  public misPaquetes;
  public paqueteActivo: PaqueteActivo = new PaqueteActivo();
  public sesionesPorCalificar: Sesion = new Sesion()
  public proximaSesion: Sesion = new Sesion()
  // public sesionFinalizda: {
  //   fecha: string,
  //   sesonId: number,
  //   prestador: { nombre: string, 'imgPath': string }
  // } = { fecha: '', sesonId: 0, prestador: { nombre: '', imgPath: '' } }

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

  public activarCuenta(email: string, codigoValidacion: string) {

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

  public crearUsario(email: string, passw: string, repassw: string) {
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
        .subscribe((resp) => {
          if (resp['error'] == false) {
            this._ionicComponentPrvdr.showLongToastMessage('Pago realizado.')
            observer.next(true);
          } else {
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
      .subscribe((resp) => {
        console.log(resp)
        this.misPaquetes = resp
      })
  }

  public obetenerPaqueteActivos() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    this.paqueteActivo.prestador.nombres
    let request = this.http.get<PaqueteActivo>(URL_PAQUETE_ACTIVO, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp: PaqueteActivo) => {
        if (Object.keys(resp).length) {
          this.paqueteActivo = resp;
        }
      })
  }

  public obtenerSesionesPorCalificar() {
    let headers = this._autenticacionPrvdr.gerHeaders();

    let request = this.http.get(URL_CALIFICAR_SESION, { headers })
    this._peticionPrvdr.peticion(request, 'sesionesPorCalificar')
      .map((resp: any) => {
        // resp= resp.map((data) => {
        //   return this.mapSesion(data)
        // })
        // console.log(resp, 'resp')
        // return resp
        return this.mapSesion(resp)
      })
      .subscribe((resp: any) => {
        this.sesionesPorCalificar = resp
        if (resp.length) {
          // this.sesionesPorCalificar.prestador.nombreCompleto = resp[0].compraDetalle.prestador.nombres + resp[0].compraDetalle.prestador.primerApellido + resp[0].compraDetalle.prestador.segundoApellido
          // this.sesionesPorCalificar.prestador.imagePath = resp[0].compraDetalle.prestador.imagePath
          // this.sesionesPorCalificar.fechaInicio = resp[0].fechaInicio
          // this.sesionesPorCalificar.sesionId = resp[0].id
          this.sesionesPorCalificar = resp
        }
      })
  }

  public calificarSesion(calificacion) {
    let headers = this._autenticacionPrvdr.gerHeaders();

    let request = this.http.post(URL_CALIFICAR_SESION, calificacion, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp: any) => {
        if (resp.estado == "ok") {
          this.sesionesPorCalificar.sesionId = 0
          this._ionicComponentPrvdr.showLongToastMessage('Calificacion realizada.')
          // traer otra sesion por calificar
          // let sesiones:any = []
          // this._almacenamientoPrvdr.obtener('sesionesPorCalificar')
          //   .then((data) => {
          //     sesiones = JSON.parse(data['data']).filter((item) => {
          //       if (item.id != calificacion.sesionId) {
          //         return true;
          //       }
          //     })
          //     this._almacenamientoPrvdr.guardar('sesionesPorCalificar', JSON.stringify(sesiones))
          //     if (sesiones.length) {
          //       this.sesionFinalizda.prestador.nombre =
          //       sesiones[0].compraDetalle.prestador.nombres + sesiones[0].compraDetalle.prestador.primerApellido + sesiones[0].compraDetalle.prestador.segundoApellido
          //       this.sesionFinalizda.prestador.imgPath =sesiones[0].compraDetalle.prestador.imagePath
          //       this.sesionFinalizda.fecha = sesiones[0].fechaInicio
          //       this.sesionFinalizda.sesonId = sesiones[0].id
          //     }
          //   })
        }
      })
  }

  obtenerProximaSesion() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    
    let request = this.http.get(URL_PROXIMA_SESION, { headers })
    this._peticionPrvdr.peticion(request)
      .map((resp: any) => {
        return this.mapSesion(resp)
      })
      .subscribe((resp: any) => {
        this.proximaSesion = resp
        console.log(this.proximaSesion)
      })
  }
  protected mapSesion(resp: any) {
    console.log(Object.keys(resp).length)
    let sesion: Sesion = new Sesion()
    if (Object.keys(resp).length) {
      sesion.calificacion = resp.calificacion
      sesion.sesionId = resp.id
      sesion.prestador.nombreCompleto = resp.compraDetalle.prestador.nombres + resp.compraDetalle.prestador.primerApellido + resp.compraDetalle.prestador.segundoApellido
      sesion.prestador.imagePath = resp.compraDetalle.prestador.imagePath;
      sesion.fechaInicio = resp.fechaInicio
      sesion.ubicacion.title = resp.titulo
      sesion.ubicacion.complemento = resp.complemento
      sesion.ubicacion.direccion = resp.direccion
      sesion.ubicacion.longitud = resp.longitud
      sesion.ubicacion.latitud = resp.latitud
    }
    return sesion
  }
}

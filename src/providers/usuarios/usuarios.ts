import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { IonicComponentProvider } from '../ionic-component/ionic-component';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { Observable } from "rxjs/Observable"

import { PaqueteActivo, Sesion,Bolsa,MisPaquetes } from '../../models/models.index';

import * as arraySort from 'array-sort';
import * as moment from 'moment';


import {
  URL_REGISTRO_USUARIO,
  URL_ACTIVAR_USUARIO,
  URL_PAGAR,
  URL_MIS_PAQUETES,
  URL_PAQUETE_ACTIVO,
  URL_CALIFICAR_SESION,
  URL_PROXIMA_SESION,
  URL_PROGRAMAR_SESION,
  URL_CANCELAR_SESION,
  URL_CANCELAR_PAQUETE,
  URL_SALDO_BOLSA,
  URL_BOLSA,
  URL_CANCELAR_RENOVAR
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
  public bolsa: Bolsa = new Bolsa()

  public paqueteActivo: PaqueteActivo = new PaqueteActivo();
  public sesionesPorCalificar: Sesion = new Sesion()
  public proximaSesion: Sesion = new Sesion()

  constructor(
    private http: HttpClient,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    public _autenticacionPrvdr: AutenticacionProvider,
    public modalCtrl: ModalController,
  ) {
    console.log('Hello UsuariosProvider Provider');
    console.log(this.paqueteActivo, Object.keys(this.paqueteActivo.compradetallesesiones).length, 'paqueteActivo')
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
    let request = this.http.get<MisPaquetes>(URL_MIS_PAQUETES, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp:MisPaquetes[]) => {
        this.misPaquetes = resp
      })
  }

  public renovarPaquete(compraDetalleId){
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post(URL_CANCELAR_RENOVAR,{compraDetalleId:compraDetalleId},{ headers })
    return this._peticionPrvdr.peticion(request)
      
  }

  public obetenerPaqueteActivos() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get<PaqueteActivo>(URL_PAQUETE_ACTIVO, { headers })
    this._peticionPrvdr.peticion(request, '', true)
      .map((resp: PaqueteActivo) => {
        if (resp.compradetallesesiones) {
          for (let i = 0; i < resp.compradetallesesiones.length; i++) {
            resp.compradetallesesiones[i] = this.mapSesion(resp.compradetallesesiones[i])
          }
        }
        return resp
      })
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
        return this.mapSesion(resp)
      })
      .subscribe((resp: any) => {
        this.sesionesPorCalificar = resp
        if (resp.length) {
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
      })
  }

  public programarSesionModalOpen(sesion) {

    if (this.diferenciaHora(sesion.fechaInicio)) {
      let modal = this.modalCtrl.create('ProgramarSesionPage', { sesion: sesion })
      modal.present();
      modal.onDidDismiss(data => {
        if (data != undefined) {
          this.programarSesion(data)
            .subscribe((res) => {
              //   this.paqueteActivo = this.paqueteActivo
            })
        }
      });

    } else {
      this._ionicComponentPrvdr.showAlert({
        title: 'Reprogramar Sesión',
        subTitle: 'Solo se puede reprogramar sesión  una hora antes de la fecha de inicio.',
        buttons: ['OK']
      })
    }
  }

  public programarSesion(data) {
    // complemento,
    // direccion,
    // fecha,
    // latitud,
    // longitud,
    // sesionId,
    // titulo
    let headers = this._autenticacionPrvdr.gerHeaders();

    let request = this.http.post(URL_PROGRAMAR_SESION, data, { headers })


    let observable = new Observable((observer) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((resp) => {
          this.actulizarDetalleSesion(resp)
          this._ionicComponentPrvdr.showLongToastMessage('Programación realizada.')
          observer.next(true);
        })
    })

    return observable
  }

  public saldoBolsa() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get(URL_SALDO_BOLSA, { headers })
    return this._peticionPrvdr.peticion(request)
    // .subscribe((resp:any) => {
    //   this.saldo = resp["saldo"]
    // })
  }

  public getbolsa() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get<Bolsa>(URL_BOLSA, { headers })
    return this._peticionPrvdr.peticion(request)
      .subscribe((resp: Bolsa) => {
        this.bolsa = resp
      })
  }

  public cancelarSesionAlert(sesion) {

    if (this.diferenciaHora(sesion.fechaInicio)) {

      let myMoment: moment.Moment = moment(new Date(sesion.fechaInicio), "America/Bogota").locale('es-CO')
      this._ionicComponentPrvdr.showAlert({
        title: '¿Cancelar sesión?',
        message: '¿Esta seguro de cancelar sesión del ' + myMoment.format('LLLL') + ' en ' + sesion.ubicacion.title + ' ?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {

            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.cancelarSesion(sesion)
            }
          }
        ]
      })

    } else {
      this._ionicComponentPrvdr.showAlert({
        title: 'Cancelar Sesión',
        subTitle: 'Solo se puede cancelar sesión  una hora antes de la fecha de inicio.',
        buttons: ['OK']
      })
    }
  }

  public cancelarSesion(sesion) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post(URL_CANCELAR_SESION, { sesionId: sesion.sesionId }, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp) => {
        this.actulizarDetalleSesion(resp)
        this._ionicComponentPrvdr.showLongToastMessage('Sesion cancelada.')
      })
  }

  public cancelarPaquete(data) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post(URL_CANCELAR_PAQUETE, data, { headers })
    return this._peticionPrvdr.peticion(request)

  }

  protected mapSesion(resp: any) {
    let sesion: Sesion = new Sesion()
    if (Object.keys(resp).length) {
      sesion.calificacion = resp.calificacion
      sesion.sesionId = resp.id
      sesion.prestador.nombreCompleto = resp.compraDetalle.prestador.nombres + resp.compraDetalle.prestador.primerApellido + resp.compraDetalle.prestador.segundoApellido
      sesion.prestador.imagePath = resp.compraDetalle.prestador.imagePath;
      sesion.prestador.zona = resp.compraDetalle.prestador.zona
      sesion.fechaInicio = resp.fechaInicio
      sesion.ubicacion.title = resp.titulo
      sesion.ubicacion.complemento = resp.complemento
      sesion.ubicacion.direccion = resp.direccion
      sesion.ubicacion.longitud = resp.longitud
      sesion.ubicacion.latitud = resp.latitud
      sesion.estado.id = resp.estado.id
      sesion.estado.estado = resp.estado.estado
      sesion.paquete.nombre = resp.compraDetalle.nombre
      sesion.paquete.valor = resp.compraDetalle.valor
      sesion.paquete.detalle = resp.compraDetalle.detalle
      sesion.fin = resp.fin
      sesion.inicio = resp.inicio
      sesion.duracion = this.diff(sesion.inicio, sesion.fin)["minuto"] * -1
    }
    return sesion
  }


  protected actulizarDetalleSesion(data) {

    this.paqueteActivo.compradetallesesiones
      .map((resp) => {
        if (resp.sesionId == data.sesionId) {
          resp.ubicacion.complemento = data.complemento
          resp.ubicacion.direccion = data.direccion
          resp.fechaInicio = data.fechaInicio
          resp.ubicacion.latitud = data.latitud
          resp.ubicacion.title = data.titulo

          if (data.estado.id == 2) {
            resp.estado.id = data.estado.id
            resp.estado.estado = data.estado.estado
            this.paqueteActivo.sesionAgendadas++
            this.paqueteActivo.sesionPorAgendar--
          }
          else if (data.estado.id == 4) {
            resp.estado.id = data.estado.id
            resp.estado.estado = data.estado.estado
          }
          else if (data.estado.id == 1) {
            resp.estado.id = data.estado.id
            resp.estado.estado = data.estado.estado
            this.paqueteActivo.sesionAgendadas--
            this.paqueteActivo.sesionPorAgendar++
          }

        }
      })

    arraySort(this.paqueteActivo.compradetallesesiones, 'fechaInicio')
  }

  //toda sesion con hora de inicio con diferencia de una 1 hora a hora actual

  public sesionPorIniciar(sesion) {
    let now = new Date()
    let diff = this.diff(sesion.fechaInicio, now)["hora"]
    if (diff >= 0 && diff <= 1 && (sesion.estado.id == 2 || sesion.estado.id == 4)) {
      return true
    } else {
      return false
    }
  }

  public localizar(sesion) {
    let now = new Date()
    let diferencia = this.diff(sesion.fechaInicio, now)["minuto"]
    if (diferencia <= 15 && (sesion.estado.id == 2 || sesion.estado.id == 4)) {
      return true
    } else {
      return false
    }
  }

  // valida si se ha iniciado sesion

  public sesionnoIniciada(sesion) {
    let now = new Date()
    let diff = this.diff(sesion.fechaInicio, now)["hora"]

    if (diff < 0 && sesion.estado != 5) {
      return true
    } else {
      return false
    }
  }

  // calcula si se puede maodificar sesion

  public diferenciaHora(fechaInicio) {
    let now = new Date()
    let diff = this.diff(fechaInicio, now)["hora"]
    if (diff < 1 && diff != null) {
      return false
    } else {
      return true
    }
  }

  public diff(fechaInicio, fechaFin) {
    if (fechaInicio == null || fechaFin == null) {
      return { hora: null, minuto: null, dia: null }
    }
    let fi = new Date(fechaInicio).getTime()
    let ff = new Date(fechaFin).getTime()
    let diff = fi - ff;
    let hora = diff / (1000 * 60 * 60)// (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
    let minuto = diff / (1000 * 60)
    let dia = diff / (1000 * 60 * 60 * 24)
    return { hora: hora, minuto: minuto, dia: dia }
  }


}

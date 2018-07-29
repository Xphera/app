import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeticionProvider } from '../peticion/peticion';
import {
  URL_SESION_POR_INICIAR,
  URL_SESION_PROXIMA,
  URL_SESION_FINALIZADA,
  URL_SESION_INICIAR,
  URL_SESION_FINALIZAR,
  URL_SESION_INICIADA,
  URL_SESION_CANCELAR,
  URL_SESION_DETALLE
} from '../../config/url.config';
import { Sesion } from '../../model/models.index';
import 'rxjs/add/operator/map';
// import { AutenticacionProvider } from '../autenticacion/autenticacion';


/*
  Generated class for the SesionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SesionProvider {

  public porIniciar: Array<Sesion> = new Array<Sesion>()
  public proxima: Array<Sesion> = new Array<Sesion>()
  public finalizada: Array<Sesion> = new Array<Sesion>()
  public sesionInicida:Sesion = new Sesion()
  public SesionDetalle:Sesion = new Sesion()

  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider,
    // private _autenticacionPrvdr:AutenticacionProvider
  ) {
    console.log('Hello SesionProvider Provider');
  }

  getSesionPorIniciar() {
    let headers =this._peticionPrvdr.getHeaders();
    let request = this.http.get<Sesion[]>(URL_SESION_POR_INICIAR,{ headers })
    this._peticionPrvdr.peticion({ request: request,loading:false })
      .map((resp: any) => {
        if (resp) {
          for (let i = 0; i < resp.length; i++) {
            resp[i] = this.mapSesion(resp[i])
          }
        }
        return resp
      })
      .subscribe((resp: Sesion[]) => {
        this.porIniciar = resp
      })
  }

  getSesionProxima() {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get<Sesion[]>(URL_SESION_PROXIMA,{ headers })
    this._peticionPrvdr.peticion({ request: request,loading:false })
      .map((resp: any) => {
        if (resp) {
          for (let i = 0; i < resp.length; i++) {
            resp[i] = this.mapSesion(resp[i])
          }
        }
        return resp
      })
      .subscribe((resp: Sesion[]) => {
        this.proxima = resp
      })
  }

  getSesionFinalizada() {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get<Sesion[]>(URL_SESION_FINALIZADA,{ headers })
    this._peticionPrvdr.peticion({ request: request,loading:false})
      .map((resp: any) => {
        if (resp) {
          for (let i = 0; i < resp.length; i++) {
            resp[i] = this.mapSesion(resp[i])
          }
        }
        return resp
      })
      .subscribe((resp: Sesion[]) => {
        this.finalizada = resp
      })
  }

  getSesionIniciada() {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get<Sesion>(URL_SESION_INICIADA,{ headers })
    this._peticionPrvdr.peticion({ request: request,loading:false })
      .map((resp: any) => {
        console.log(resp)
        if (resp) {
          for (let i = 0; i < resp.length; i++) {
            resp = this.mapSesion(resp[i])
          }
        }
        return resp
      })
      .subscribe((resp: Sesion) => {
        if (Object.keys(resp).length) {
          this.sesionInicida = resp
        }

      })
  }


  getSesion(sesionId) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get<Sesion[]>(URL_SESION_DETALLE+sesionId+'/',{ headers })
    return this._peticionPrvdr.peticion({ request: request,loading:false})
      .map((resp: any) => {
        return this.mapSesion(resp)
      })
  }



  iniciar(sesion) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post<Sesion[]>(URL_SESION_INICIAR, { sesionId: sesion.sesionId },{ headers })
    return this._peticionPrvdr.peticion({ request: request })
      .map((resp: any) => {
        sesion.inicio = resp.inicio
        sesion.estado.estado = resp.estado
        sesion.estado.id = resp.estadoId
        //capturar sesion iniciada
        this.sesionInicida = sesion
        this.porIniciar = this.recalcularSesiones(this.porIniciar,sesion)
        return sesion
      })

  }

  finalizar(sesion,tipo,novedad) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post<Sesion[]>(URL_SESION_FINALIZAR, { sesionId: sesion.sesionId,tipo,novedad },{ headers })
    return this._peticionPrvdr.peticion({ request: request })
      .map((resp: any) => {
        sesion.inicio = resp.inicio
        sesion.fin = resp.fin
        sesion.fechaInicio = resp.fechaInicio
        sesion.estado.estado = resp.estado
        sesion.estado.id = resp.estadoId
        sesion.ubicacion.direccion = resp.direccion
        sesion.duracion = this.diff(sesion.fin, sesion.inicio)["minuto"]
        //capturar sesion iniciada
        this.sesionInicida = sesion
        // this.porIniciar = this.recalculasesiones(this.porIniciar,sesion)
        return sesion
      })

  }

  cancelar(sesion) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post<Sesion[]>(URL_SESION_CANCELAR, { sesionId: sesion.sesionId},{ headers })
    return this._peticionPrvdr.peticion({ request: request })
      .map((resp: any) => {
        sesion.inicio = resp.inicio
        sesion.fin = resp.fin
        sesion.fechaInicio = resp.fechaInicio
        sesion.estado.estado = resp.estado.estado
        sesion.estado.id = resp.estado.id
        sesion.ubicacion.direccion = resp.direccion
        //capturar sesion iniciada
        this.sesionInicida = sesion
        this.porIniciar = this.recalcularSesiones(this.porIniciar,sesion)
        this.proxima = this.recalcularSesiones(this.proxima,sesion)
        return sesion
      })

  }

  recalcularSesiones(sesiones:Array<Sesion>,sesion:Sesion ){
    return sesiones.filter((data:Sesion)=>{
        if(data.sesionId != sesion.sesionId){
          return data
        }
    })
  }

  protected mapSesion(resp: any) {
    let sesion: Sesion = new Sesion()
    if (Object.keys(resp).length) {

      let nombres = resp.compraDetalle.compra.cliente.nombres == null ? '' : resp.compraDetalle.compra.cliente.nombres + ' ';
      let primerApellido = resp.compraDetalle.compra.cliente.primerApellido == null ? '' : resp.compraDetalle.compra.cliente.primerApellido + ' ';
      let segundoApellido = resp.compraDetalle.compra.cliente.segundoApellido == null ? '' : resp.compraDetalle.compra.cliente.segundoApellido

      sesion.calificacion = resp.calificacion
      sesion.sesionId = resp.id
      sesion.cliente.nombreCompleto = nombres + primerApellido + segundoApellido
      sesion.cliente.imagePath = resp.compraDetalle.prestador.imagePath;
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
      sesion.duracion = this.diff(sesion.fin, sesion.inicio)["minuto"]
    }
    return sesion
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

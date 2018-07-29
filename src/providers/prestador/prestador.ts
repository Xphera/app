import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  URL_PRESTADOR,
  URL_PRESTADOR_ZONA,
  URL_CAMBIAR_PASSWORD,
  URL_CAMBIAR_USUARIO
} from '../../config/url.config';
import { PeticionProvider } from '../peticion/peticion';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { Pestador } from '../../model/models.index';
import { Observable } from "rxjs/Observable";
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
/*
  Generated class for the PrestadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestadorProvider {
  public prestador: Pestador = new Pestador()
  public nuevo_usuario: string
  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider,
    private _autenticacionPrvdr: AutenticacionProvider,
    private _almacenamientoPrvdr: AlmacenamientoProvider) {
    console.log('Hello PrestadorProvider Provider');
    this._almacenamientoPrvdr.obtener('nuevo_usuario').then(
      (data: any) => {
        this.nuevo_usuario = data.data;
      })
  }

  obtenerPrestador() {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get<Pestador>(URL_PRESTADOR, { headers, params: { userId: 'userId' } })
    this._peticionPrvdr.peticion({ request: request }).subscribe(
      (resp: Pestador) => {
        this.prestador = resp
      })
  }

  editarInfoBasica(data) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.put(URL_PRESTADOR + this.prestador.id + '/', data, { headers })
    return this._peticionPrvdr.peticion({ request: request })
      .map(
        (resp: any) => {
          this.prestador.telefono = data.telefono
          this.prestador.direccion = data.direccion
          this.prestador.fechaNacimiento = data.fechaNacimiento
          return resp
        })
  }

  guardarZona(geodata) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post(URL_PRESTADOR_ZONA, { geodata }, { headers })
    return this._peticionPrvdr.peticion({ request: request })
  }

  zonaPrestador() {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.get(URL_PRESTADOR_ZONA, { headers })
    return this._peticionPrvdr.peticion({ request: request })

  }

  cambioContraseña(passwords) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.put(URL_CAMBIAR_PASSWORD, passwords, { headers })
    return new Observable(observer => {
      this._peticionPrvdr.peticion({ request: request })
        .subscribe((resp: any) => {
          this._autenticacionPrvdr.guardarToken(resp.token)
          observer.next(true);
        })
    })
  }

  cambioUsuario(datos) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.post(URL_CAMBIAR_USUARIO, datos, { headers })
    return new Observable(observer => {
      this._peticionPrvdr.peticion({ request: request })
        .subscribe((resp: any) => {
          this.nuevo_usuario = datos.newusuario
          this._almacenamientoPrvdr.guardar('nuevo_usuario', this.nuevo_usuario)
            .then(
              () => {
                observer.next(true);
              })
        })
    })
  }

  cambioUsuarioCodigo(datos) {
    let headers = this._peticionPrvdr.getHeaders();
    let request = this.http.put(URL_CAMBIAR_USUARIO, datos, { headers })
    return new Observable(observer => {
      this._peticionPrvdr.peticion({ request: request })
        .subscribe((resp: any) => {
          this._almacenamientoPrvdr.eliminar('nuevo_usuario').then(
            () => {
              this.prestador.email = datos.newusuario
              this._autenticacionPrvdr.guardarToken(resp.token)
              observer.next(true);
            })
        })
    })
  }
}

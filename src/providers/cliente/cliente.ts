//pasar contenid o usuario y eliminar
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  URL_CLIENTE,
  URL_CAMBIAR_PASSWORD,
  URL_CAMBIAR_USUARIO,
  URL_CAMBIAR_USUARIO_VALIDAR_CODIGO
} from '../../config/url.confing';
import { AutenticacionProvider } from '../autenticacion/autenticacion';

import { Cliente } from '../../models/models.index';

import { Observable } from "rxjs/Observable";
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';


/*
  Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteProvider {

  public cliente: Cliente = new Cliente();
  public nuevoUsuario: string = '';

  constructor(
    public http: HttpClient,
    private _autenticacionPrvdr: AutenticacionProvider,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider) {
    console.log('Hello ClienteProvider Provider');
  }

  obtenerCliente() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get<Cliente>(URL_CLIENTE, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp: Cliente) => {
        this.cliente = resp;
      })

  }

  guardar(cliente: Cliente) {

    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.put<Cliente>(URL_CLIENTE, cliente, { headers })
    return new Observable((observer) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((resp: Cliente) => {
          this.cliente = cliente;
          observer.next(true)
        })
    })

  }

  cambioContraseña(passwords) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.put<Cliente>(URL_CAMBIAR_PASSWORD, passwords, { headers })
    this._peticionPrvdr.peticion(request)
      .subscribe((resp: any) => {
        this._autenticacionPrvdr.guardarUsuario(resp)
      })
  }

  cambioUsuario(datos) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post<Cliente>(URL_CAMBIAR_USUARIO, datos, { headers })
    return new Observable(observer => {
      this._peticionPrvdr.peticion(request)
        .subscribe((resp: any) => {
          this._almacenamientoPrvdr.guardar('nuevo_usuario', datos.newusuario)
            .then(
              () => {
                observer.next(true);
              })
        })
    })
  }

  obetenerNuevoUsuario() {
    return this._almacenamientoPrvdr.obtener('nuevo_usuario')
  }

  cambioUsuarioValidarCodigo(datos) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.put<Cliente>(URL_CAMBIAR_USUARIO_VALIDAR_CODIGO, datos, { headers })
    return new Observable(observer => {
      this._peticionPrvdr.peticion(request)
        .subscribe((resp: any) => {
          this._almacenamientoPrvdr.eliminar('nuevo_usuario').then(
            () => {
              this._autenticacionPrvdr.guardarUsuario(resp)
              observer.next(true);
            })
        })
    })
  }


}

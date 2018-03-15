import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_UBICACIONES } from '../../config/url.confing';

import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { IonicComponentProvider } from '../ionic-component/ionic-component';

import { Ubicacion } from '../../models/models.index';

import { Observable } from "rxjs/Observable"


/*
  Generated class for the UbicacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionesProvider {

  public ubicaciones: Array<Ubicacion> = new Array<Ubicacion>();

  constructor(
    public http: HttpClient,
    public _autenticacionPrvdr: AutenticacionProvider,
    public _almacenamientoPrvdr: AlmacenamientoProvider,
    private _ionicComponentPrvdr: IonicComponentProvider
  ) {
    console.log('Hello UbicacionesProvider Provider');
    this.grabarUbicaciones();
  }

  grabarUbicaciones() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    this.http.get<Ubicacion[]>(BASE_URL_UBICACIONES, { headers })
      .subscribe((data: Ubicacion[]) => {
        this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(data)).then(() => {
          this.ubicaciones = data;
        })
      });
  }

  obtenerUbicaciones() {
    this._almacenamientoPrvdr.obtener('ubicaciones').then((datos: { satatus: string, data: string }) => {
      this.ubicaciones = JSON.parse(datos.data);
    })
  }

  /**
  *elimina una dirección
  *@id id de dirección
  *@index posicion de dirección en Array de direcciones
  */
  eliminarUbicacion(id: number, index: number) {

    let loader = this._ionicComponentPrvdr.showloader("por favor espera...");
    let headers = this._autenticacionPrvdr.gerHeaders();

    let observable = new Observable((observer) => {
      this.http.delete<Ubicacion[]>(BASE_URL_UBICACIONES + id, { headers })
        .subscribe((data: Ubicacion[]) => {
          this.ubicaciones.splice(index, 1);
          this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(this.ubicaciones));
          loader.dismiss();
          this._ionicComponentPrvdr.showLongToast(
            {
              message: 'Registro Eliminado.',
              duration: 6000
            }
          );
          observer.next(false);
        },
          (errores) => {
            console.log(errores);
            let listaerrores: string = this.httpErrores(errores);
            loader.dismiss();
            this._ionicComponentPrvdr.showAlert({
              title: 'Error!',
              subTitle: listaerrores,
              buttons: ['OK']
            });
          });
      observer.next(true);
    });
    return observable;
  }

  guardarUbicacion(ubicacion: Ubicacion) {
    let loader = this._ionicComponentPrvdr.showloader("por favor espera...")
    let headers = this._autenticacionPrvdr.gerHeaders();
    let observable = new Observable((observer) => {
      this.http.post<Ubicacion>(BASE_URL_UBICACIONES, ubicacion, { headers })
        .subscribe((data: Ubicacion) => {
          this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(this.ubicaciones)).
            then((datos: { satatus: string, data: string }) => {
              this.ubicaciones = JSON.parse(datos.data);
              loader.dismiss();
              this._ionicComponentPrvdr.showLongToast(
                {
                  message: 'Registro Guardado.',
                  duration: 6000
                }
              );
            });
          observer.next(false);
        },
          (errores) => {
            let listaerrores: string = this.httpErrores(errores);
            loader.dismiss();
            this._ionicComponentPrvdr.showAlert({
              title: 'Error!',
              subTitle: listaerrores,
              buttons: ['OK']
            });
            observer.next(true);
          });
    });
    return observable;
  }

  editarUbicacion(id: number, ubicacion: Ubicacion) {
    let loader = this._ionicComponentPrvdr.showloader("por favor espera...")
    let headers = this._autenticacionPrvdr.gerHeaders();

    let observable = new Observable((observer) => {
      this.http.put<Ubicacion>(BASE_URL_UBICACIONES + id + '/', ubicacion, { headers })
        .subscribe((data: Ubicacion) => {
          this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(this.ubicaciones)).
            then((datos: { satatus: string, data: string }) => {
              this.ubicaciones = JSON.parse(datos.data);
              loader.dismiss();
              this._ionicComponentPrvdr.showLongToast(
                {
                  message: 'Regustro Guardado.',
                  duration: 6000
                }
              );
            });
          observer.next(false);
        },
          (errores) => {
            let listaerrores: string = this.httpErrores(errores);
            loader.dismiss();
            console.log(listaerrores);
            this._ionicComponentPrvdr.showAlert({
              title: 'Error!',
              subTitle: listaerrores,
              buttons: ['OK']
            });
            observer.next(true);
          });
    });
    return observable;
  }


  httpErrores(errores) {
    let listaerrores: string = '';
    for (let e of Object.keys(errores.error)) {
      for (let error of errores.error[e]) {
        listaerrores += e + ' ' + error + "<br>"
      }
    }
    return listaerrores;
  }


}

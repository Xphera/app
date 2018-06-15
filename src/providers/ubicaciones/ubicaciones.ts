import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_UBICACIONES } from '../../config/url.confing';

import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { IonicComponentProvider } from '../ionic-component/ionic-component';

import { Ubicacion } from '../../models/models.index';

import { Observable } from "rxjs/Observable";

import { PeticionProvider } from '../peticion/peticion';



/*
  Generated class for the UbicacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionesProvider {

  public ubicaciones: Array<Ubicacion> = new Array<Ubicacion>();
  key: string = 'ubicaciones'

  constructor(
    public http: HttpClient,
    public _autenticacionPrvdr: AutenticacionProvider,
    public _almacenamientoPrvdr: AlmacenamientoProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    private _peticionPrvdr: PeticionProvider,
  ) {
    console.log('Hello UbicacionesProvider Provider');
    this.grabarUbicaciones();
  }

  grabarUbicaciones() {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.get<Ubicacion[]>(URL_UBICACIONES, { headers })
    this._peticionPrvdr.peticion(request, this.key)
      .subscribe((data: Ubicacion[]) => {
        this.ubicaciones = data;
      });
  }

  obtenerUbicaciones() {
    let observable = Observable.fromPromise(
      this._peticionPrvdr.almacenamiento(this.key)
        .then((datos) => {
          this.ubicaciones = JSON.parse(datos['data']);
        })
    )
    return observable;
  }

  /**
  *elimina una dirección
  *@id id de dirección
  *@index posicion de dirección en Array de direcciones
  */
  eliminarUbicacion(ubicacion: Ubicacion) {

    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.delete(URL_UBICACIONES + ubicacion.id, { headers })


    let observable = new Observable((observer) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data) => {
          this.ubicaciones.splice(ubicacion.index, 1);
          this._almacenamientoPrvdr.guardar(this.key, JSON.stringify(this.ubicaciones));
          observer.next(true);
          this._ionicComponentPrvdr.showLongToastMessage('Ubicación Eliminada.')
        })
    })
    return observable;
    // let loader = this._ionicComponentPrvdr.showloader("por favor espera...");
    // let observable = new Observable((observer) => {
    //   this.http.delete<Ubicacion[]>(URL_UBICACIONES + ubicacion.id, { headers })
    //     .subscribe((data: Ubicacion[]) => {
    //       this.ubicaciones.splice(ubicacion.index, 1);
    //       this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(this.ubicaciones));
    //       // loader.dismiss();
    //       this._ionicComponentPrvdr.showLongToast(
    //         {
    //           message: 'Registro Eliminado.',
    //           duration: 6000,
    //           showCloseButton:true,
    //           closeButtonText:'X'
    //         }
    //       );
    //       observer.next(false);
    //     },
    //       (errores) => {
    //         console.log(errores);
    //         let listaerrores: string = this.httpErrores(errores);
    //         loader.dismiss();
    //         this._ionicComponentPrvdr.showAlert({
    //           title: 'Error!',
    //           subTitle: listaerrores,
    //           buttons: ['OK']
    //         });
    //       });
    //   observer.next(true);
    // });
  }

  guardarUbicacion(ubicacion: Ubicacion) {

    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post<Ubicacion>(URL_UBICACIONES, ubicacion, { headers })

    let observable = new Observable((observer) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data: Ubicacion) => {
          this.ubicaciones.push(ubicacion);
          this._almacenamientoPrvdr.guardar(this.key, JSON.stringify(this.ubicaciones))
            .then(() => {
              observer.next(true);
              this._ionicComponentPrvdr.showLongToastMessage('Ubicación Creada.')
            })
        })
    })
    return observable;

    // let loader = this._ionicComponentPrvdr.showloader("por favor espera...")
    // let headers = this._autenticacionPrvdr.gerHeaders();
    // let observable = new Observable((observer) => {
    //   this.http.post<Ubicacion>(URL_UBICACIONES, ubicacion, { headers })
    //     .subscribe((data: Ubicacion) => {
    //       this.ubicaciones.push(data);
    //       this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(this.ubicaciones)).
    //         then(() => {
    //           loader.dismiss();
    //           this._ionicComponentPrvdr.showLongToast(
    //             {
    //               message: 'Registro Guardado.',
    //               duration: 6000,
    //               showCloseButton: true,
    //               closeButtonText: 'X'
    //             }
    //           );
    //         });
    //       observer.next(false);
    //     },
    //       (errores) => {
    //         let listaerrores: string = this.httpErrores(errores);
    //         loader.dismiss();
    //         this._ionicComponentPrvdr.showAlert({
    //           title: 'Error!',
    //           subTitle: listaerrores,
    //           buttons: ['OK']
    //         });
    //         observer.next(true);
    //       });
    // });
    // return observable;
  }

  editarUbicacion(ubicacion: Ubicacion) {
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.put<Ubicacion>(URL_UBICACIONES + ubicacion.id + '/', ubicacion, { headers })

    let observable = new Observable((observer) => {
      this._peticionPrvdr.peticion(request)
        .subscribe((data: Ubicacion) => {
          this.ubicaciones[ubicacion.index] = ubicacion;
          this._almacenamientoPrvdr.guardar(this.key, JSON.stringify(this.ubicaciones))
            .then(() => {
              this._ionicComponentPrvdr.showLongToastMessage('Ubicación Actulizada.')
              observer.next(true);
            })
        })
    })
    return observable;

    // let loader = this._ionicComponentPrvdr.showloader("por favor espera...")
    // let headers = this._autenticacionPrvdr.gerHeaders();
    //
    // let observable = new Observable((observer) => {
    //   this.http.put<Ubicacion>(URL_UBICACIONES + ubicacion.id + '/', ubicacion, { headers })
    //     .subscribe((data: Ubicacion) => {
    //       this.ubicaciones[ubicacion.index] = ubicacion;
    //       this._almacenamientoPrvdr.guardar('ubicaciones', JSON.stringify(this.ubicaciones)).
    //         then(() => {
    //           loader.dismiss();
    //           this._ionicComponentPrvdr.showLongToast(
    //             {
    //               message: 'Registro Guardado.',
    //               duration: 3000,
    //               showCloseButton: true,
    //               closeButtonText: 'X'
    //             }
    //           );
    //         }).catch(() => {
    //           loader.dismiss();
    //         });
    //       observer.next(false);
    //     },
    //       (errores) => {
    //         let listaerrores: string = this.httpErrores(errores);
    //         loader.dismiss();
    //         console.log(listaerrores);
    //         this._ionicComponentPrvdr.showAlert({
    //           title: 'Error!',
    //           subTitle: listaerrores,
    //           buttons: ['OK']
    //         });
    //         observer.next(true);
    //       });
    // });
    // return observable;
  }


}

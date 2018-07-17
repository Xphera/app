import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable"
import { IonicComponentProvider } from '../ionic-component/ionic-component';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';

/*
  Generated class for the PeticionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeticionProvider {

  peticionId: number = 0;
  showloader: any;
  protected loading: boolean = true

  constructor(
    public http: HttpClient,
    private _ionicComponentPrvdr: IonicComponentProvider,
    public _almacenamientoPrvdr: AlmacenamientoProvider) {
    console.log('Hello PeticionProvider Provider');
  }

  peticion(request, key?: string, loading?: boolean) {

    this.loading =  loading == undefined ? true : false
    
    console.log(this.loading )
    if (this.peticionId == 0) {
      this.showloaderOpen()
    }
    this.peticionId++
    let observable = new Observable((observer) => {
      request.subscribe((resp) => {
        //si existe almacena valor por key
        if (key) {
          this._almacenamientoPrvdr.guardar(key, JSON.stringify(resp))
        }

        observer.next(resp);

        this.peticionId--
        if (this.peticionId == 0) {
          this.showloaderClose()
        }

      },
        (errores) => {
          this.peticionId--
          if (this.peticionId == 0) {
            this.showloaderClose()
          }
          let listaerrores: string = this.httpErrores(errores);
          this._ionicComponentPrvdr.showAlert({
            title: 'Error!',
            subTitle: listaerrores,
            buttons: ['OK']
          });
          observer.error(errores);
          //
        }
      )
    })
    return observable;
  }

  protected showloaderOpen() {

    if(this.loading)
    this.showloader = this._ionicComponentPrvdr.showloaderMessage('por favor espera...')
  }

  protected showloaderClose() {
    this.showloader.dismiss()
    console.log('cerrar')
  }

  private httpErrores(errores) {
    const isBoolean = val => 'boolean' === typeof val;
    let listaerrores: string = '';
	console.log(errores)
    for (let e of Object.keys(errores.error)) {
      if (Array.isArray(errores.error[e])) {
        for (let error of errores.error[e]) {
          if (!isBoolean(errores)) {
            listaerrores += e + ' ' + error + "<br>"
          }

        }
      }
      else {
        if (!isBoolean(errores.error[e]))
          listaerrores += errores.error[e] + "<br>"
      }
    }
    return listaerrores;
  }

  almacenamiento(key) {
    let promesa = new Promise((resolve, reject) => {
      this._almacenamientoPrvdr.obtener(key)
        .then((datos) => {
          resolve(datos);
        },
          error => {
            reject({ satatus: 'false' });
          });
    })
    return promesa;
  }

}

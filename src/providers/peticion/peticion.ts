import { HttpClient,HttpHeaders } from '@angular/common/http';
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
  private token:string
  // protected loading: boolean
  constructor(
    public http: HttpClient,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _ionicComponentPrvdr: IonicComponentProvider, ) {
    console.log('Hello PeticionProvider Provider');
    this._almacenamientoPrvdr.obtener('token').then(
      (data: any) => {
        this.token = data.data;
      })
  }

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Token ' + this.token,
      'Content-Type': 'application/json'
    });
    return headers;
  }

  peticion(input: input) {

    let loading = false
    if (input.loading == undefined || input.loading == true) {
      loading = true
    }

    let observable = new Observable((observer) => {

      if(loading){
        if (this.peticionId == 0 ) {
          this.showloaderOpen()
        }
        ++this.peticionId

      }
      console.log(input.request)
      input.request.subscribe((resp) => {
        //si existe almacena valor por key
        // if (input.key) {
        //   this._almacenamientoPrvdr.guardar(key, JSON.stringify(resp))
        // }
        observer.next(resp);

        if (loading) {
          --this.peticionId
          if (this.peticionId == 0) {
            this.showloaderClose()
          }

        }
      },
        (errores) => {
          --this.peticionId
          if (this.peticionId == 0) {
            this.showloaderClose()
          }
          let listaerrores: string = this.httpErrores(errores);
          this._ionicComponentPrvdr.showAlert({
            title: '',
            subTitle: listaerrores,
            buttons: ['OK']
          });
          observer.error(errores);
        }
      )
    })
    return observable;
  }

  private httpErrores(errores) {
    const isBoolean = val => 'boolean' === typeof val;
    let listaerrores: string = '';

    for (let e of Object.keys(errores.error)) {
      if (Array.isArray(errores.error[e])) {
        for (let error of errores.error[e]) {
          if (!isBoolean(errores)) {
            // listaerrores += e + ' ' + error + "<br>"
            listaerrores += error + "<br>"
          }

        }
      }
      else {
        if (!isBoolean(errores.error[e]))
          // listaerrores += errores.error[e] + "<br>"
          listaerrores += errores.error[e] + "<br>"
      }
    }
    return listaerrores;
  }

  protected showloaderOpen() {
    this.showloader = this._ionicComponentPrvdr.showloaderMessage('por favor espera...')
    console.log('abro')
  }

  protected showloaderClose() {
    // if(this.showloader)
    this.showloader.dismiss()
    console.log('cierro')
  }
}

export interface input {
  request,
  key?: string,
  loading?: boolean
}

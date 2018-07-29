import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';


/*
  Generated class for the AlmacenamientoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlmacenamientoProvider {

  constructor(
    private storage: NativeStorage,
    private platform: Platform) {
    console.log('Hello AlmacenamientoProvider Provider');
  }

  /**
  *guardar datos en storage
  */
  public guardar(llave, datos) {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.setItem(llave, datos).then(
          () => {
            resolve({ status: 'ok' })
          },
          error => {
            reject({ status: 'false' })
          }
        )
      } else {
        localStorage.setItem(llave, datos);
        resolve({ status: 'ok' });
      }
    });
    return promesa;
  }

  /**
  *obtener datos de storage
  */
  public obtener(llave) {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.getItem(llave).then(
          (data) => {
            resolve({ status: 'ok', data: data });
          },
          error => {
            reject({ status: 'false' });
          }
        )
      } else {
        let data = localStorage.getItem(llave);
        resolve({ status: 'ok', data: data })
      }
    })
    return promesa;
  }

  /**
  *eliminar datos de storage
  */
  public eliminar(llave) {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.remove(llave).then(
          () => {
            resolve({ status: 'ok' })
          },
          error => {
            reject({ status: 'false' })
          }
        )
      } else {
        localStorage.removeItem(llave);
        resolve({ status: 'ok' })
      }
    })
    return promesa;
  }
}

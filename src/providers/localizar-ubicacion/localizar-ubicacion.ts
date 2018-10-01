import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { IonicComponentProvider } from '../ionic-component/ionic-component';

/*
  Generated class for the LocalizarUbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalizarUbicacionProvider {

  constructor(
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private _ionicComponentPrvdr: IonicComponentProvider,
  ) {
    console.log('Hello LocalizarUbicacionProvider Provider');

  }

    public gps() {
      let loader = this._ionicComponentPrvdr.showloaderMessage('Buscando ubicación...');
      let coords = {
        'longitud':-74.0761965,
        'latitud':4.5981451
      }
      return new Promise((resolve, reject) => {
        this.gpsActivo().then(() => {
          this.geolocation.getCurrentPosition({ timeout: 30000 })
            .then(
              location => {
                loader.dismiss();
                resolve(location);
              }
            )
            .catch(error => {
              loader.dismiss();
              reject(coords)
            });
        })
        .catch((error) => {
          loader.dismiss();
          reject(coords)
        })

      })
    }

    public gpsActivo() {
      return new Promise((resolve, reject) => {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if (canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                console.log('Request successful')
                resolve(true)
              },
              error => {
                console.log('Error requesting location permissions', error)
                reject(false)
              }
            );
          }
        })
      })
    }

}

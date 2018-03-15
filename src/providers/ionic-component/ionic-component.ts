import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';

/*
  Generated class for the IonicComponentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IonicComponentProvider {

  constructor(
    public http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
    console.log('Hello IonicComponentProvider Provider');
  }


  showLongToast(confing) {
    this.toastCtrl.create(confing).present();
  }

  showAlert(confing) {
    this.alertCtrl.create(confing).present();
  }

  showloader(texto) {
    let loader = this.loadingCtrl.create({
      content: texto,
    });
    loader.present();
    return loader;
  }
}

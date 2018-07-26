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

  showLongToastMessage(mensaje: string) {
    this.showLongToast({
      message: mensaje,
      // duration: 6000,
      // dismissOnPageChange: true,
      closeButtonText:'X',
      showCloseButton:true,
      position: 'top',
      duration: 10000,
    })
  }

  showLongToast(confing) {
    this.toastCtrl.create(confing).present();
  }

  showAlert(confing) {
    this.alertCtrl.create(confing).present();
  }

  showloaderMessage(texto) {
    let loader = this.showloader({
      content: texto,
      // dismissOnPageChange: true
    });
    return loader;
  }

  showloader(confing) {
    let loader = this.loadingCtrl.create(confing);
    loader.present();
    return loader;
  }
}

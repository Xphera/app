import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SesionProvider } from '../../providers/sesion/sesion';

import { PushNotificationProvider } from '../../providers/push-notification/push-notification';

/**
 * Generated class for the SesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {
  tipoSesion: string = "porIniciar";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sesionPrvdr: SesionProvider,
    public _pushNotificationPrvdr: PushNotificationProvider
  ) {

    this._sesionPrvdr.getSesionPorIniciar()
    this._sesionPrvdr.getSesionIniciada()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SesionPage');
  }

  detalleSesion(sesion) {
    this.navCtrl.push('DetalleSesionPage', { sesion, tipoSesion: this.tipoSesion })
  }

  getSesion(e) {
    if (e.value == 'porIniciar') {
      this._sesionPrvdr.getSesionPorIniciar()
    }
    else if (e.value == 'proxima') {
      this._sesionPrvdr.getSesionProxima()
    }
    else if (e.value == 'finalizada') {
      this._sesionPrvdr.getSesionFinalizada()
    }
  }

}

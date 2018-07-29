import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the EliminarCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eliminar-cuenta',
  templateUrl: 'eliminar-cuenta.html',
})
export class EliminarCuentaPage {

  aceptar = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EliminarCuentaPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '¡Advertencia!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [
        {
          text: 'Aceptar y borrar',
          handler: data => {
            console.log('Aceptar y borrar');
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar');
          }
        }
      ]
    });
    alert.present();
  }

}

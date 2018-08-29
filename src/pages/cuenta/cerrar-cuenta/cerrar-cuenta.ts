import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClienteProvider } from '../../../providers/cliente/cliente';

/**
 * Generated class for the CerrarCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cerrar-cuenta',
  templateUrl: 'cerrar-cuenta.html',
})
export class CerrarCuentaPage {
  public aceptar: boolean
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private _clientePrvdr: ClienteProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CerrarCuentaPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '¡Advertencia!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [
        {
          text: 'Aceptar y Cerrar cuenta',
          handler: data => {
            this.cerraCuenta()
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


  cerraCuenta() {
    this._clientePrvdr.cerrarCuenta(this.aceptar)
      .subscribe((request) => {
        console.log(request)
        this.navCtrl.setRoot('HomeUsuarioPage')
      })
  }

}

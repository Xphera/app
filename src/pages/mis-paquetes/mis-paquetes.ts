import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the MisPaquetesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-paquetes',
  templateUrl: 'mis-paquetes.html',
})
export class MisPaquetesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosPrvdr:UsuariosProvider) {
      this._usuariosPrvdr.obtenerMisPaquetes()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisPaquetesPage');
  }

}

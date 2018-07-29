import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { CONFIG } from '../../config/comunes.config';
/**
 * Generated class for the BolsaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bolsa',
  templateUrl: 'bolsa.html',
})
export class BolsaPage {

  CONFIG = CONFIG;
  constructor(
    public navCtrl: NavController,
    private _usuariosPrvdr: UsuariosProvider,
    public navParams: NavParams) {
      this._usuariosPrvdr.getbolsa()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BolsaPage');
  }

}

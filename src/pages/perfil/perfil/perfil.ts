import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

import { ClienteProvider } from '../../../providers/cliente/cliente';
import {
  BASE_URL
} from '../../../config/url.confing';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  BASE_URL = BASE_URL

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _clientePrvdr: ClienteProvider,
    private modalCtrl: ModalController) {
    this._clientePrvdr.obtenerCliente()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  editarPerfil(cliente) {
    let modal = this.modalCtrl.create('PerfilEditarPage',{cliente});
    modal.present();
  }

}

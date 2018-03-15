import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Asociado } from '../../models/models.index';

/**
 * Generated class for the PerfilAsociadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-asociado',
  templateUrl: 'perfil-asociado.html',
})
export class PerfilAsociadoPage {
  asociado: Asociado;
  segment: string = 'perfil';
  paquetespage = 'PaquetesPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.asociado = this.navParams.get("asociado");
  }

  verPaquetes(asociado: Asociado) {
    this.navCtrl.push(this.paquetespage, { asociado })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilAsociadoPage');
  }

}

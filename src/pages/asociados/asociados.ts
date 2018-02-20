import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AsociadosProvider } from '../../providers/asociados/asociados';

/**
 * Generated class for the AsociadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asociados',
  templateUrl: 'asociados.html',
})
export class AsociadosPage {

  paquetespage: string = 'PaquetesPage'
  perfilasociadopage: string = 'PerfilAsociadoPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _asociadosPrver: AsociadosProvider) {
    this._asociadosPrver.obtenerAsociadosCategoria();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociadosPage');
  }

  verPaquetes() {
    this.navCtrl.push(this.paquetespage)
  }

  perfilAsociado(asociado: any) {
    this.navCtrl.push(this.perfilasociadopage, { asociado });
  }

}

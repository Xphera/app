import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AsociadosProvider } from '../../providers/asociados/asociados';
import { Servicio,Asociado } from '../../models/models.index';

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
  servicio: Servicio = new Servicio();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _asociadosPrvr: AsociadosProvider) {

    this.servicio = this.navParams.get('servicio');

    this._asociadosPrvr.obtenerAsociadosServicios(this.servicio.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociadosPage');
  }

  verPaquetes(asociado:Asociado) {
    this.navCtrl.push(this.paquetespage, { asociado })
  }

  perfilAsociado(asociado:Asociado) {
    this.navCtrl.push(this.perfilasociadopage, { asociado });
  }

}

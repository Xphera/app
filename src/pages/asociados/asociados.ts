import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Asociado } from '../../models/models.index';

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
  public asociados:Array<Asociado>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.asociados = this.navParams.get('asociados')
  }

  verPaquetes(asociado:Asociado) {
    this.navCtrl.push(this.paquetespage, { asociado })
  }

  perfilAsociado(asociado:Asociado) {
    this.navCtrl.push(this.perfilasociadopage, { asociado });
  }


}

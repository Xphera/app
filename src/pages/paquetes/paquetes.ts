import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaquetesProvider } from '../../providers/paquetes/paquetes';
import { CONFIG } from '../../config/comunes.config';
import { Asociado } from '../../models/models.index';
import { Paquete } from '../../models/models.index';


/**
 * Generated class for the PaquetesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paquetes',
  templateUrl: 'paquetes.html',
})
export class PaquetesPage {
  agendarpage = 'AgendarPage';

  CONFIG = CONFIG;
  asociado: Asociado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _paquetesPrvdr: PaquetesProvider,
  ) {
    this.asociado = this.navParams.get('asociado');
    // this._paquetesPrvdr.obeternerPaqueteCategoria(this.asociado.servicios);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaquetesPage');
  }

  detallePago(paquete: Paquete) {
    this.navCtrl.push('DetallePagoPage', { paquete })
  }

}

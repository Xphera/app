import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaqueteActivo } from '../../models/models.index';

/**
 * Generated class for the DetallePaqueteActivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-paquete-activo',
  templateUrl: 'detalle-paquete-activo.html',
})
export class DetallePaqueteActivoPage {
  public paqueteActivo:PaqueteActivo = new PaqueteActivo()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      let paquete = this.navParams.get("paquete")
    if(paquete != undefined){
        this.paqueteActivo = paquete;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleSesionesCompradasPage');
  }

}

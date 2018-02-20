import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaquetesProvider } from '../../providers/paquetes/paquetes';

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

  agendarpage='AgendarPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _paquetesPrvdr:PaquetesProvider) {
      this._paquetesPrvdr.obeternerPaqueteCategoria();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaquetesPage');
  }

}

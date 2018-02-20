import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  asociado:any;
  segment:string = 'perfil';
  paquetespage = 'PaquetesPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.asociado = this.navParams.get("asociado");
    console.log(this.asociado);
  }

  verPaquetes(){
    this.navCtrl.push(this.paquetespage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilAsociadoPage');
  }

}

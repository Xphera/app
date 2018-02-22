import { Component } from '@angular/core';
import { IonicPage ,NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { CONFIG } from '../../../config/comunes.config';

/**
 * Generated class for the ActivarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activar',
  templateUrl: 'activar.html',
})
export class ActivarPage {
  CONFIG = CONFIG

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                private _usuariosPrvdr:UsuariosProvider) {
  }

  activarCuenta(){
    this._usuariosPrvdr.activarCuenta().then((resp)=>{
      if(resp['activa']){
        this.navCtrl.setRoot('HomePage');
      }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { CONFIG } from '../../config/comunes.config';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';

/**
 * Generated class for the MisPaquetesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-paquetes',
  templateUrl: 'mis-paquetes.html',
})
export class MisPaquetesPage {
  CONFIG = CONFIG;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _ionicComponentPrvdr: IonicComponentProvider,
    private _usuariosPrvdr: UsuariosProvider) {
    this._usuariosPrvdr.obtenerMisPaquetes()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisPaquetesPage');
  }

  renovar(id) {
    this._usuariosPrvdr.renovarPaquete(id)
      .subscribe((resp: any) => {
        if (resp.errores.total == 0) {
          this.navCtrl.push('DetallePagoPage', { paquete: resp.paquete })
        } else {
          if (resp.errores.texto["ubicacion"]) {
            this._ionicComponentPrvdr.showLongToastMessage(resp.errores.texto["ubicacion"])
          } else if (resp.errores.texto["paquete"]) {
            this._ionicComponentPrvdr.showLongToastMessage(resp.errores.texto["paquete"])
          } else {
            this._ionicComponentPrvdr.showLongToastMessage(resp.errores.texto["prestador"])
          }

        }
      })
  }

}

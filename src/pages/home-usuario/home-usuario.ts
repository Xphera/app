import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the HomeUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-usuario',
  templateUrl: 'home-usuario.html',
})
export class HomeUsuarioPage {



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _usuariosPrvdr: UsuariosProvider) {
    this._usuariosPrvdr.obetenerPaqueteActivos()
    this._usuariosPrvdr.obtenerSesionesPorCalificar()
    this._usuariosPrvdr.obtenerProximaSesion()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUsuarioPage');
  }

  sesiones(event) {
    this.navCtrl.push('DetallePaqueteActivoPage', { paquete: event.paquete })
  }
  detalleSesion(event){
    this.navCtrl.push('DetalleSesionPage')
  }

  enviarCalificacion(event) {
    this._usuariosPrvdr.calificarSesion(event)
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the ModalCalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-calificacion',
  templateUrl: 'modal-calificacion.html',
})
export class ModalCalificacionPage {

  public sesion: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _usuariosPrvdr: UsuariosProvider
  ) {
    this.sesion = this.navParams.get('sesion')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCalificacionPage');
  }

  enviarCalificacion(event) {
    this._usuariosPrvdr.calificarSesion(event)
  }

}

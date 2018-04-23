import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PaqueteActivo } from '../../models/models.index';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

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
  public paqueteActivo: PaqueteActivo = new PaqueteActivo()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _usuariosPrvdr: UsuariosProvider) {
    let paquete = this.navParams.get("paquete")
    console.log(paquete)
    if (paquete != undefined) {
      this.paqueteActivo = paquete;
    }
  }

  detalleSesion(event) {
    this.navCtrl.push('DetalleSesionPage')
  }

  cancelarSesion(event) {
    console.log(event, 'cancelarSesion')
  }

  reprogramarSesion(event) {
    console.log(event, 'reprogramarSesion')
  }

  programarSesion(event) {

    let modal = this.modalCtrl.create('ProgramarSesionPage', { sesion: event })
    modal.present();
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this._usuariosPrvdr.programarSesion(
          data.complemento,
          data.direccion,
          data.fecha,
          data.latitud,
          data.longitud,
          data.sesionId,
          data.titulo
        )
          .subscribe((res) => {
            this.paqueteActivo = this._usuariosPrvdr.paqueteActivo
          })
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleSesionesCompradasPage');
  }
  //
}

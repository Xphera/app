import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisponibilidadProvider } from '../../providers/disponibilidad/disponibilidad';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
/**
 * Generated class for the DisponibilidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disponibilidad',
  templateUrl: 'disponibilidad.html',
})
export class DisponibilidadPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _disponibilidadPrvdr: DisponibilidadProvider,
    public ionicComponentPrvdr: IonicComponentProvider,
  ) {
    this._disponibilidadPrvdr.obtenerDisponibiliad()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisponibilidadPage');
  }

  guardar(event) {
  this._disponibilidadPrvdr.enviarDisponibiliad(event)
  .subscribe(
          (resp) => {
            this.ionicComponentPrvdr.showLongToastMessage('Disponibilidad guardada.')
          })
}

}

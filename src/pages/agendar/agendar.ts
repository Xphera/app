import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CONFIG } from '../../config/comunes.config';

/**
 * Generated class for the AgendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendar',
  templateUrl: 'agendar.html',
})
export class AgendarPage {

  paquete: any;
  CONFIG = CONFIG

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.paquete = this.navParams.get("paquete")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarPage');
  }

  programarSesion(sesion: any, index: number) {
    let modal = this.modalCtrl.create('ProgramarSesionPage', { sesion, index });
    modal.present();
    modal.onDidDismiss(programacion => {
      if (programacion) {console.log( programacion.agenda.startTime);
          this.paquete.sesiones[index].lugar = programacion.ubicacion.title;
          this.paquete.sesiones[index].fecha = programacion.agenda.startTime;
      }
    });
  }

}

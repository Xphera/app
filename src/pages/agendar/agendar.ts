import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CONFIG } from '../../config/comunes.config';

import { AgendaProvider } from '../../providers/agenda/agenda';

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
  metodosPagos:string = 'MetodosPagosPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public _agendaPrvdr:AgendaProvider
  ) {
    this.paquete = this.navParams.get("paquete");
    this._agendaPrvdr.agendar(this.paquete);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendarPage');
  }

  programarSesion(sesion: any, index: number) {
    let modal = this.modalCtrl.create('ProgramarSesionPage', { sesion, index });
    modal.present();
    modal.onDidDismiss(programacion => {
      if (programacion) {
          this.paquete.sesiones[index] = programacion;
          this._agendaPrvdr.agendar(this.paquete);
      }
    });
  }

}

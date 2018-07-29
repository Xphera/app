import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,App } from 'ionic-angular';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';

/**
 * Generated class for the MiCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mi-cuenta',
  templateUrl: 'mi-cuenta.html',
})
export class MiCuentaPage {
  asociado: any;
  segment: string = 'perfil';

  itemPluralMapping = {
    'sesion': {
      '=1': '1 sesión',
      'other': '# sesiones'
    }, 'hora': {
      '=1': '1 hora',
      'other': '# horas'
    },
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _prestadorPrvdr: PrestadorProvider,
    public _autenticacionPrvdr: AutenticacionProvider,
    public modalCtrl: ModalController,
    public app:App
  ) {
    _prestadorPrvdr.obtenerPrestador()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiCuentaPage');
  }

  modalEditarInformacionBasica() {
    this.modalCtrl.create('EditarInformacionBasicaPage',
      { prestador: this._prestadorPrvdr.prestador },
      { cssClass: 'inset-modal' })
      .present();
  }

  logout() {
    this._autenticacionPrvdr.logout()
      .then(() => {
        // this.navCtrl.setRoot('LoginPage')
        this.app.getRootNav().setRoot('LoginPage')
      })
  }

  navPush(page) {
    this.navCtrl.push(page);
  }

}

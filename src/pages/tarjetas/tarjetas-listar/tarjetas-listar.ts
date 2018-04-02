import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TarjetaCredito } from '../../../models/models.index';
import { MetodoPagoProvider } from '../../../providers/metodo-pago/metodo-pago';
import { IonicComponentProvider } from '../../../providers/ionic-component/ionic-component';

/**
 * Generated class for the TarjetasListarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarjetas-listar',
  templateUrl: 'tarjetas-listar.html',
})
export class TarjetasListarPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _metodoPagoPrvdr: MetodoPagoProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    private modalCtrl: ModalController) {
    this._metodoPagoPrvdr.obtenerTarjetasCredito()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetasListarPage');
  }

  modalAgregar() {
      let modal = this.modalCtrl.create('TarjetasAgregarPage')
      modal.present()
  }

  eliminarTarjeta(td: TarjetaCredito) {
    let config = {
      title: '',
      message: '¿Eliminar tarjeta ' + td.paymentMethod + ' ' + td.maskedNumber + ' ?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this._metodoPagoPrvdr.eliminarTarjeta(td.creditCardTokenId)
            .subscribe((resp)=>{
                  this._ionicComponentPrvdr.showLongToastMessage('Tarjeta de crédito eliminada')
            })
          }
        }
      ]
    }
    this._ionicComponentPrvdr.showAlert(config)
  }

}

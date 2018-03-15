import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { TarjetaCredito } from '../../models/models.index';

/**
 * Generated class for the MetodosPagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-metodos-pagos',
  templateUrl: 'metodos-pagos.html',
})
export class MetodosPagosPage {

  cards:TarjetaCredito[] = []

  agergrarMedioPago:string = 'AgregarMedioPagoPage';

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MetodosPagosPage');
  }

  agregarMedioPago() {
   let modal = this.modalCtrl.create(this.agergrarMedioPago);
   modal.present();
   modal.onDidDismiss( parametros =>{
     if(parametros){
       this.cards.push(parametros.card);
       console.log(this.cards);
     }

   });
 }

}

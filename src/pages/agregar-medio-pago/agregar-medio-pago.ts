import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreditCardValidator } from 'ngx-credit-cards';

import { TarjetaCredito } from '../../models/models.index';

import { MetodoPagoProvider } from '../../providers/metodo-pago/metodo-pago';


/**
 * Generated class for the AgregarMedioPagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-medio-pago',
  templateUrl: 'agregar-medio-pago.html',
})
export class AgregarMedioPagoPage {

  cardImage = 'assets/imgs/misc/credit-card.png';

  card: TarjetaCredito = new TarjetaCredito();

  myForm: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cardIO: CardIO,
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    private _metodoPagoPrvdr: MetodoPagoProvider
  ) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarMedioPagoPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      cardType: ['', Validators.required],
      cardholderName: ['', Validators.required],
      cardNumber: ['', CreditCardValidator.validateCardNumber],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', CreditCardValidator.validateCardCvc]
    });
  }

  saveData() {
    if (this.myForm.valid) {
      this._metodoPagoPrvdr.guardarTarjetaCredito(this.card);
      this.viewCtrl.dismiss({ card: this.card });
    }
  }

  scanCard() {
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            const options = {
              scanExpiry: true,
              hideCardIOLogo: true,
              scanInstructions: 'Por favor coloque su tarjeta dentro del marco',
              keepApplicationTheme: true,
              requireCCV: true,
              requireExpiry: true,
              requireCardholderName: true,
              requirePostalCode: false,
              supressManual: true,
              useCardIOLogo: true
            };
            this.cardIO.scan(options).then(response => {
              const { cardType, cardNumber, redactedCardNumber,
                expiryMonth, expiryYear, cvv, postalCode, cardholderName } = response;
              this.card = {
                cardType,
                cardNumber,
                redactedCardNumber,
                expiryMonth,
                expiryYear,
                cvv,
                postalCode,
                cardholderName,
              };
            });
          }
        });
  }

  get cvv() { return this.myForm.get('cvv'); }

  // Just to animate the fab
  fabGone = false;
  ionViewWillEnter() {
    this.fabGone = false;
  }

  ionViewWillLeave() {
    this.fabGone = true;
  }

}

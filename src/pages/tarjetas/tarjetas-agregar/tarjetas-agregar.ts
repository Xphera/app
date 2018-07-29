import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CreditCardValidator } from 'ngx-credit-cards';

import { MetodoPagoProvider } from '../../../providers/metodo-pago/metodo-pago';

import { TarjetaCredito } from '../../../models/models.index';

import { IonicComponentProvider } from '../../../providers/ionic-component/ionic-component';

import { CardIO } from '@ionic-native/card-io';



/**
 * Generated class for the TarjetasAgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarjetas-agregar',
  templateUrl: 'tarjetas-agregar.html',
})
export class TarjetasAgregarPage {

  myForm: FormGroup;
  td: TarjetaCredito = new TarjetaCredito();

  franquiciaImagen: string = "custom-CODENSA"
  franquicia: string = ''
  franquicias = [
    { franquicia: 'VISA', patron: '^(4)(\\d{12}|\\d{15})$|^(606374\\d{10}$)' },
    { franquicia: 'MASTERCARD', patron: '^(5[1-5]\\d{14}$)|^(2(?:2(?:2[1-9]|[3-9]\\d)|[3-6]\\d\\d|7(?:[01]\\d|20))\\d{12}$)' },
    { franquicia: 'DINERS', patron: '(^[35](?:0[0-5]|[68][0-9])[0-9]{11}$)|(^30[0-5]{11}$)|(^3095(\\d{10})$)|(^36{12}$)|(^3[89](\\d{12})$)' },
    { franquicia: 'AMEX', patron: '^3[47][0-9]{13}$' },
    { franquicia: 'NARANJA', patron: '^(589562)\\d{10}$' },
    { franquicia: 'SHOPPING', patron: '(^603488(\\d{10})$)|(^2799(\\d{9})$)' },
    { franquicia: 'CABAL', patron: '(^604(([23][0-9][0-9])|(400))(\\d{10})$)|(^589657(\\d{10})$)' },
    { franquicia: 'ARGENCARD', patron: '^(501105|532362)(\\d{10}$)' },
    { franquicia: 'CENCOSUD', patron: '^603493(\\d{10})$' },
    { franquicia: 'HIPERCARD', patron: '^(384100|384140|384160|606282)(\\d{10}|\\d{13})$' },
    { franquicia: 'CODENSA', patron: '^590712(\\d{10})$' },
    { franquicia: 'ELO', patron: '(^(636368|438935|504175|451416|636297|650901|650485|650541|650700|650720|650720|650720|655021|650405)\\d{10})$|(^(5090|5067|4576|4011)\\d{12})$|(^(50904|50905|50906)\\d{11})$' }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private _metodoPagoPrvdr: MetodoPagoProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    private cardIO: CardIO) {

    this.myForm = this.createMyForm();

    this.myForm.controls['cardNumber'].valueChanges.subscribe(
      (value: string) => {
        this.franquicia = ""
        this.franquiciaImagen = ""
        for (let i = 0; i < this.franquicias.length; i++) {
          let regexp = new RegExp(this.franquicias[i].patron)
          if (regexp.test(value)) {

            if(this.franquicias[i].franquicia != "AMEX" && this.franquicias[i].franquicia != "DINERS" && this.franquicias[i].franquicia != "MASTERCARD" && this.franquicias[i].franquicia != "VISA" ){
                this.franquiciaImagen = "custom-CODENSA"
            }else{
                this.franquiciaImagen = "custom-"+this.franquicias[i].franquicia
            }
            this.franquicia = this.franquicias[i].franquicia
          }
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetasAgregarPage');
  }

  private createMyForm() {

    return this.formBuilder.group({
      cardNumber: ['', CreditCardValidator.validateCardNumber],
      fullName: ['', [Validators.required]],
      month: ['', [Validators.required, this.validateMonth]],
      year: ['', [Validators.required, this.validateYear]],
    });
  }


  validateMonth(control: FormControl): { [s: string]: boolean } {
    if ((control.value < 1 || control.value > 12 ) || isNaN(control.value)) {
      return {
        validateMonth: true
      }
    }
    return null
  }

  validateYear(control: FormControl): { [s: string]: boolean } {
    let fecha = new Date();
    if (parseInt(control.value) < fecha.getFullYear() || isNaN(control.value)) {
      return {
        validateYear: true
      }
    }
    return null
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
              requireCCV: false,
              requireExpiry: true,
              requireCardholderName: true,
              requirePostalCode: false,
              supressManual: true,
              useCardIOLogo: true
            };
            this.cardIO.scan(options).then(response => {
              const { cardNumber, expiryMonth, expiryYear, cardholderName } = response;
              this.myForm.setValue({
                'cardNumber': cardNumber,
                'fullName': cardholderName,
                'month': expiryMonth,
                'year': expiryYear
              });
            });
          }
        });
  }


  guardar() {
    if (this.myForm.valid) {
      this.td.cardNumber = this.myForm.value.cardNumber
      this.td.fullName = this.myForm.value.fullName
      this.td.paymentMethod = this.franquicia
      this.td.expirationDate = this.myForm.value.year + '/' + this.myForm.value.month
      this._metodoPagoPrvdr.guardarTarjetaCredito(this.td)
        .subscribe((resp) => {
          this.cerrarModal();
          this._ionicComponentPrvdr.showLongToastMessage('Tarjeta de crédito agregada')
        })
    }
  }

  cerrarModal() {
    this.viewCtrl.dismiss()
  }
}

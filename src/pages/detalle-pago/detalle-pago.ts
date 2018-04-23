import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Paquete } from '../../models/models.index';
import { CONFIG } from '../../config/comunes.config';
import { MetodoPagoProvider } from '../../providers/metodo-pago/metodo-pago';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { NgModel } from '@angular/forms';

/**
 * Generated class for the DetallePagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-pago',
  templateUrl: 'detalle-pago.html',
})
export class DetallePagoPage {
  public paquete: Paquete
  CONFIG = CONFIG;
  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _metodoPagoPrvdr: MetodoPagoProvider,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private _usuariosPrvdr: UsuariosProvider) {



    this._metodoPagoPrvdr.obtenerTarjetasCredito()
    this.paquete = this.navParams.get('paquete')

    this.myForm = this.createMyForm()
    this.myForm.patchValue({
      cuotas: 1,
      paqueteId: this.paquete.id,
    })

    this._metodoPagoPrvdr
      .tcPrincipal.subscribe((data) => {
        this.myForm.controls['tokenId'].setValue(data['creditCardTokenId']);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePagoPage');
  }



  public guardar() {

    if (this.myForm.valid) {
      this._usuariosPrvdr.pagar(this.myForm.value)
        .subscribe((data) => {
          this.navCtrl.setRoot('HomeUsuarioPage')
        })
    }
  }

  private createMyForm() {

    return this.formBuilder.group({
      tokenId: ['', [Validators.required]],
      paqueteId: ['', [Validators.required]],
      cuotas: ['', [Validators.required]]
    });
  }

  public modalAgregar() {
    let modal = this.modalCtrl.create('TarjetasAgregarPage')
    modal.present()
  }

}

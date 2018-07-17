import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Paquete } from '../../models/models.index';
import { CONFIG } from '../../config/comunes.config';
import { MetodoPagoProvider } from '../../providers/metodo-pago/metodo-pago';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';

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
  saldoBolsa: number = 0;

  bolsa = {
    saldo: 0,
    NuevoSaldo: 0,
    valorDescontar: 0,
  }

  valorCobroTC:number = 0
  metodoPago:string=""

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _metodoPagoPrvdr: MetodoPagoProvider,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private _usuariosPrvdr: UsuariosProvider,
    private _ionicComponentPrvdr: IonicComponentProvider) {

    this.paquete = this.navParams.get('paquete')

    this.myForm = this.createMyForm()

    // this._metodoPagoPrvdr
    //   .tcPrincipal.subscribe((data) => {
    //     this.myForm.controls['tokenId'].setValue(data['creditCardTokenId']);
    //   })

    this.myForm.patchValue({
      cuotas: 1,
      paqueteId: this.paquete.id,
      prestadorId: this.paquete.prestadorId,
      idRelacionPrestadorPaquete: this.paquete.idRelacionPrestadorPaquete
    })


    this._usuariosPrvdr.saldoBolsa()
      .subscribe((resp: any) => {

        this.bolsa.saldo = resp.saldo

        if ( this.bolsa.saldo == 0) {
          this.metodoPago = "tarjeta"
          this.valorCobroTC = this.paquete.valor
          // cargar TC
          this.cargarTC()
        }
        else if ( this.paquete.valor > this.bolsa.saldo) {
          this.metodoPago = "mixto"
          this.bolsa.valorDescontar = this.bolsa.saldo
          this.bolsa.NuevoSaldo = 0
          this.valorCobroTC = this.paquete.valor-this.bolsa.saldo
          // cargar TC
          this.cargarTC()

        }
        else {
          this.metodoPago = "bolsa"
          this.bolsa.valorDescontar = this.paquete.valor
          this.bolsa.NuevoSaldo = this.bolsa.saldo-this.paquete.valor
        }

      })
  }


  public cargarTC(){

    // condicion de validacion
    this.myForm.addControl('tokenId', new FormControl('', Validators.required) );
    this.myForm.addControl('cuotas', new FormControl('', Validators.required) );
    this._metodoPagoPrvdr.obtenerTarjetasCredito()
    this.myForm.controls['cuotas'].setValue(1);

    this._metodoPagoPrvdr
      .tcPrincipal.subscribe((data) => {
        this.myForm.controls['tokenId'].setValue(data['creditCardTokenId']);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePagoPage');
  }

  ionViewCanEnter(): boolean {
    if (this._usuariosPrvdr.paqueteActivo.compradetallesesiones.length > 0) {
      this._ionicComponentPrvdr.showAlert({
        title: '',
        subTitle: 'ya tienes un paquete activo',
        buttons: ['Aceptar']
      })
      return false;
    } else {
      return true;
    }
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
      paqueteId: ['', [Validators.required]],
      prestadorId: ['', [Validators.required]],
      idRelacionPrestadorPaquete: ['', [Validators.required]],
    });
  }

  public modalAgregar() {
    let modal = this.modalCtrl.create('TarjetasAgregarPage')
    modal.present()
  }

}

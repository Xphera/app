import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClienteProvider } from '../../../providers/cliente/cliente';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
/**
 * Generated class for the CerrarCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cerrar-cuenta',
  templateUrl: 'cerrar-cuenta.html',
})
export class CerrarCuentaPage {

  myForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private _clientePrvdr: ClienteProvider) {
      this.myForm = this.createMyForm();
  }

  private createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      terminosCondiciones: [false, Validators.compose([Validators.required,this.terminoCondicion])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CerrarCuentaPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '¡Advertencia!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [
        {
          text: 'Aceptar y Cerrar cuenta',
          handler: data => {
            this.cerraCuenta()
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar');
          }
        }
      ]
    });
    alert.present();
  }


  cerraCuenta() {
    this._clientePrvdr.cerrarCuenta(this.myForm.value)
  }

  terminoCondicion(control:FormControl):{[s:string]:boolean}{
    if(control.value != true)
    {
      return{
        terminoCondicion:true
      }
    }
    return null
  }

}

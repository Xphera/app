import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteProvider } from '../../../providers/cliente/cliente';

/**
 * Generated class for the CambiarContraseñaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-contraseña',
  templateUrl: 'cambiar-contraseña.html',
})
export class CambiarContraseñaPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private _clientePrvdr: ClienteProvider) {

    this.myForm = this.createMyForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarContraseñaPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newpassword: ['', Validators.compose([Validators.required])],
      repeatnewpassword: ['', Validators.compose([Validators.required])]
    });
  }

  guardar() {
    if (this.myForm.valid) {
      this._clientePrvdr.cambioContraseña(this.myForm.value);
    }
  }

}

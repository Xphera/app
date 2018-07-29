import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestadorProvider } from '../../providers/prestador/prestador';

import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';

/**
 * Generated class for the CambioContraseñaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambio-contraseña',
  templateUrl: 'cambio-contraseña.html',
})
export class CambioContraseñaPage {
  myForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _prestadorPrvdr: PrestadorProvider,
    private ionicComponentPrvdr: IonicComponentProvider,
    public navParams: NavParams) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioContraseñaPage');
  }

  guardar() {
    if (this.myForm.valid) {
      this._prestadorPrvdr.cambioContraseña(this.myForm.value)
        .subscribe((resp: any) => {          
          this.ionicComponentPrvdr.showLongToastMessage('Cambio realizado.')
          this.navCtrl.pop();
        })
    }
  }

  private createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newpassword: ['', Validators.compose([Validators.required])],
      repeatnewpassword: ['', Validators.compose([Validators.required])]
    });
  }

}

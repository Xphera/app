import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { CONFIG } from '../../../config/comunes.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ActivarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activar',
  templateUrl: 'activar.html',
})
export class ActivarPage {
  CONFIG = CONFIG
  myForm: FormGroup;
  camposForm = {
    email: '',
    codigo: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosPrvdr: UsuariosProvider,
    private formBuilder: FormBuilder) {

    this.myForm = this.createMyForm();
    _usuariosPrvdr.datosRegistro();
  }

  private createMyForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      codigo: ['', Validators.compose([Validators.required])]
    });
  }

  activarCuenta(): void {
    if (this.myForm.valid) {
      this._usuariosPrvdr.activarCuenta(this.camposForm.email, this.camposForm.codigo)
        .then((resp: any) => {
          if (resp) {
          this.navCtrl.setRoot('HomeUsuarioPage');
          }
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarPage');
  }

}

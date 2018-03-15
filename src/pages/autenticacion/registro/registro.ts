import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { UsuariosProvider } from '../../../providers/usuarios/usuarios';

import { CONFIG } from '../../../config/comunes.config';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  activapage: any = 'ActivarPage';
  CONFIG = CONFIG;
  myForm: FormGroup;
  camposForm = {
    email: '',
    passw: '',
    repassw: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _usuariosPrvdr: UsuariosProvider,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.createMyForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      passw: ['', Validators.compose([Validators.required])],
      repassw: ['', Validators.compose([Validators.required])]
    },{validator: this.matchingPasswords('passw', 'repassw')});
  }

  registroUsuario(form: NgForm) {
      if (this.myForm.valid) {
        this._usuariosPrvdr.crearUsario(this.camposForm.email, this.camposForm.passw, this.camposForm.repassw)
          .then((resp) => {
            if (resp['registro']) {
              this.navCtrl.push('ActivarPage');
            }
          });
      }else{
        console.log(this.myForm.errors);
      }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavParams, NavController } from 'ionic-angular';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { CONFIG } from '../../../config/comunes.config';

import { AutenticacionProvider } from '../../../providers/autenticacion/autenticacion';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro: any = 'RegistroPage';
  CONFIG = CONFIG
  myForm: FormGroup;
  camposLogin = {
    email: '',
    password: ''
  };

  constructor(
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public _usuariosPrvdr: UsuariosProvider,
    private _autenticacionPrvdr: AutenticacionProvider,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.createMyForm();
  }

  private createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  showForgetPasswordPopup() {
    let prompt = {
      title: 'Olvido Cuenta',
      message: 'Ingrese Correo Electrónico',
      inputs: [{
        name: 'email',
        placeholder: 'Correo Electrónico'
      },],
      buttons: [{
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'enviar',
        handler: data => {
          console.log('Send clicked');
        }
      }]
    }
    this.alert(prompt);
  }

  login() {
    if (this.myForm.valid) {
      this._autenticacionPrvdr.login(this.camposLogin.email, this.camposLogin.password)
        .subscribe(
          data => {
            // this.navCtrl.setRoot('HomePage');
            this._autenticacionPrvdr.cargaMenu()
              .then((resp:string) => {
                this.navCtrl.setRoot(resp);
              })
          },
          // error => {
          //   let alert = {
          //     subTitle: 'Correo electrónico o la contraseña es incorrecta',
          //     buttons: ['OK']
          //   }
          //   // this.alert(alert);
          // }
        );
    }
     // else {
    //   let alert = {
    //     subTitle: 'Escriba Correo electrónico valido.',
    //     buttons: ['OK']
    //   }
    //   // this.alert(alert);
    // }

  }

  cerrarLogin() {
    this.navCtrl.setRoot('HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(alert) {
    let prompt = this.alertCtrl.create(alert);
    prompt.present();
  }

}

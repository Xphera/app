import { Component } from '@angular/core';
import { IonicPage ,AlertController,NavParams,NavController } from 'ionic-angular';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { CONFIG } from '../../../config/comunes.config';


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

  registro:any = 'RegistroPage';
  CONFIG = CONFIG

  constructor(
                private alertCtrl: AlertController,
                public navParams: NavParams,
                public navCtrl: NavController,
                public _usuariosPrvdr:UsuariosProvider
            ) {

  }

  showForgetPasswordPopup() {
  let prompt = this.alertCtrl.create({
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
  });
  prompt.present();
}

cerrarLogin(){
  this.navCtrl.setRoot('HomePage');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

import { Component } from '@angular/core';
import {  IonicPage ,NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { UsuariosProvider } from '../../../providers/usuarios/usuarios';

import { CONFIG } from '../../../config/comunes.config';

//import { ActivarPage } from '../index.pages';

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

  activapage:any = 'ActivarPage';
  CONFIG = CONFIG

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public _usuariosPrvdr:UsuariosProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registroUsuario(form: NgForm){
    this._usuariosPrvdr.crearUsario(form.value.email,form.value.passw,form.value.repassw)
      .then((resp)=>{
        if(resp['registro']){
          this.navCtrl.push('ActivarPage');
        }
    });
  }

}

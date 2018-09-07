import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { CONFIG } from '../../../config/comunes.config';

import { AutenticacionProvider } from '../../../providers/autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../../../providers/almacenamiento/almacenamiento';
import {SocialFbProvider} from '../../../providers/social-fb/social-fb';
import {SocialGooGProvider} from '../../../providers/social-goog/social-goog';

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

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public _usuariosPrvdr: UsuariosProvider,
    private _autenticacionPrvdr: AutenticacionProvider,
    private formBuilder: FormBuilder,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _socialFbPrv : SocialFbProvider,
    private _socialGooGPrv :  SocialGooGProvider
  ) {
    this.myForm = this.createMyForm();

    // console.log('constructor',this.navParams.get('cerrarSesion'));
    // if(this.navParams.get('cerarSesion')==true){
    //   this._autenticacionPrvdr.cerrarSesion()
    //     .then((resp: string) => {
    //         console.log('limpia menu')
    //       }).catch((e)=>{
    //           console.log('e')
    //       })
    // }
  }


  createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  login() {
    if (this.myForm.valid) {
      this._autenticacionPrvdr.login(this.myForm.value["email"], this.myForm.value["password"])
    }
  }

  loginFb(){
    this._socialFbPrv.getToken().then(token => {
      this._autenticacionPrvdr.loginFb(token);
    }).catch(e => {
      console.log(e);
      /**@TODO: que sucede aqui?
       * 
      */
    });
    
  }

  loginGoog(){
    this._socialGooGPrv.getToken().then(token => {
      this._autenticacionPrvdr.loginGoog(token);
    });
  }
  cerrarLogin() {
    this.navCtrl.pop()
    this._almacenamientoPrvdr.obtener('ir')
      .then((data) => {
        if (data["data"] != null) {
          this._almacenamientoPrvdr.eliminar('ir')
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { AutenticacionProvider } from '../../../providers/autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../../../providers/almacenamiento/almacenamiento';
import { IonicComponentProvider } from '../../../providers/ionic-component/ionic-component';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _autenticacionPrvdr:AutenticacionProvider,
    private _almacenamientoPrvdr:AlmacenamientoProvider,
    private _ionicComponentPrvdr:IonicComponentProvider,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.createMyForm();
    this.recuperarProceso()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  createMyForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      passw: ['', Validators.compose([Validators.required])],
      repassw: ['', Validators.compose([Validators.required])]
    },{validator: this.matchingPasswords('passw', 'repassw')});
  }

  registroUsuario(form: NgForm) {
      if (this.myForm.valid) {
        this._autenticacionPrvdr.crearUsario(this.myForm.value["email"], this.myForm.value["passw"], this.myForm.value["repassw"])
          .then((resp) => {
            if (resp) {
              this.navCtrl.push('ActivarPage',{usuario:this.myForm.value["email"]});
            }
          });
      }else{
        console.log(this.myForm.errors);
      }
  }


  recuperarProceso() {
    this._almacenamientoPrvdr.obtener('registroUsuario')
      .then((data) => {
        if (data["data"] != null) {
          this._ionicComponentPrvdr.showAlert({
            title: '',
            message: '¿Desea continuar con el proceo de crear usuario '+data["data"] +'?',
            buttons: [
              {
                text: 'No',
                handler: () => {
                    this._almacenamientoPrvdr.eliminar('restablcerUsuario')
                }
              },
              {
                text: 'Si',
                handler: () => {
                  this.navCtrl.push('ActivarPage',{usuario:data["data"]});
                }
              }
            ]
          })
        }
      })
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
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

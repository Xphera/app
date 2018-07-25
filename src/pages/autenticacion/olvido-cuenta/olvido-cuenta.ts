import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CONFIG } from '../../../config/comunes.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionProvider } from '../../../providers/autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../../../providers/almacenamiento/almacenamiento';
import { IonicComponentProvider } from '../../../providers/ionic-component/ionic-component';
/**
 * Generated class for the OlvidoCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-olvido-cuenta',
  templateUrl: 'olvido-cuenta.html',
})
export class OlvidoCuentaPage {

  CONFIG = CONFIG
  public myForm: FormGroup;
  public formCodigo: FormGroup;
  public formCodigoActivo = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _autenticacionPrvdr: AutenticacionProvider,
    private _almacenamientoPrvdr: AlmacenamientoProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    private formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
    this.formCodigo = this.createformCodigo();
    this.recuperarProceso()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OlvidoCuentaPage');
  }

  enviarUsuario() {
    if (this.myForm.valid) {
      this._autenticacionPrvdr.restablecerPasswordUsuario(this.myForm.value["usuario"])
        .then((data) => {
          this.formCodigoActivo = true;
          this.formCodigo.controls["usuario"].setValue(this.myForm.value["usuario"])
        })
    }
  }


  enviarCodigo() {
    if (this.myForm.valid) {
      this._autenticacionPrvdr.restablecerPasswordCodigo(this.formCodigo.value)
    }
  }

  createformCodigo() {
    return this.formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, Validators.email])],
      codigo: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      repeatpassword: ['', Validators.compose([
        Validators.required
      ])],
    }, { validator: this.matchingPasswords('password', 'repeatpassword') });

  }

  createMyForm() {
    return this.formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  recuperarProceso() {
    this._almacenamientoPrvdr.obtener('restablcerUsuario')
      .then((data) => {
        if (data["data"] != null) {
          this._ionicComponentPrvdr.showAlert({
            title: '',
            message: '¿Desea continuar con el proceo de olvivar cuenta del usuario '+data["data"] +'?',
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
                  this.formCodigoActivo = true;
                  this.formCodigo.controls["usuario"].setValue(data["data"])
                }
              }
            ]
          })
        }
      })
  }


  // validacion de contraseña

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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';

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
  public myForm: FormGroup;
  public myFormUsuario: FormGroup;
  public myFormCodigo: FormGroup;

  public formulario: string = "login"
  public loginForm: any;
  public backgroundImage = 'https://yannbf.github.io/ionic3-components/assets/img/background/background-5.jpg';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private formBuilderUsuario: FormBuilder,
    private formBuilderCodigo: FormBuilder,
    private _autenticacionPrvdr: AutenticacionProvider,
    private ionicComponentPrvdr: IonicComponentProvider,
  ) {
    this.myForm = this.createMyForm();
    this.myFormUsuario = this.createMyFormUsuario();
    this.myFormCodigo = this.createMyFormCodigo();
    this.myFormUsuariopatchValue()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createMyForm() {
    return this.formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
      password: ['', [Validators.required]],
    });
  }

  createMyFormUsuario() {
    return this.formBuilderUsuario.group({
      usuario: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
    });
  }

  createMyFormCodigo() {
    return this.formBuilderCodigo.group({
      usuario: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required])],
      repeatpassword: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([Validators.required])]
    });
  }

  login() {
    if (this.myForm.valid) {
      this._autenticacionPrvdr.login(this.myForm.value.usuario, this.myForm.value.password)
    }
  }

  goToResetPassword() {
    this.formulario = "usuario"
  }

  enviaUsuario() {
    if (this.myFormUsuario.valid) {
      this._autenticacionPrvdr.restablecerPasword(this.myFormUsuario.value)
        .subscribe((resp: any) => {
          this.formulario = "codigo"
          this.myFormUsuariopatchValue()
          this.ionicComponentPrvdr.showLongToastMessage('Mensaje.')
        })

    }

  }

  enviaCodigo() {
    if (this.myFormCodigo.valid) {
      this._autenticacionPrvdr.restablecerPaswordValidaCodigo(this.myFormCodigo.value)
        .subscribe((resp: any) => {
          this.ionicComponentPrvdr.showLongToastMessage('Mensaje.')
        })

    }
  }

  atras() {
    if (this.formulario == "usuario") {
      this.formulario = "login"
    } else if (this.formulario == "codigo") {
      this.formulario = "usuario"
    }
  }

  myFormUsuariopatchValue(){
    this.myFormCodigo.patchValue({
      usuario: this._autenticacionPrvdr.restablecer_pasword
    })
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
/**
 * Generated class for the CambioUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambio-usuario',
  templateUrl: 'cambio-usuario.html',
})
export class CambioUsuarioPage {
  myForm: FormGroup;
  myFormCodigo: FormGroup;
  formCodigo: boolean = false

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private formBuilderCodigo: FormBuilder,
    public navParams: NavParams,
    public _prestadorPrvdr: PrestadorProvider,
  public ionicComponentPrvdr: IonicComponentProvider,) {
    this.myForm = this.createMyForm();
    this.myFormCodigo = this.createMyFormCodigo();
    this.myFormCodigopatchValue()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioUsuarioPage');
  }

  createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newusuario: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
    });
  }

  createMyFormCodigo() {
    return this.formBuilderCodigo.group({
      newusuario: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([Validators.required])],
    });
  }

  guardar() {
    if (this.myForm.valid) {
      this._prestadorPrvdr.cambioUsuario(this.myForm.value)
        .subscribe((resp) => {
          this.ingresaCodigo()
          this.ionicComponentPrvdr.showLongToastMessage('mensaje......')
        })
    }
  }


enviarCodigo(){
  if (this.myFormCodigo.valid) {
    this._prestadorPrvdr.cambioUsuarioCodigo(this.myFormCodigo.value)
      .subscribe((resp) => {
        this.ionicComponentPrvdr.showLongToastMessage('mensaje......')
        this.navCtrl.pop()
      })
  }
}


  ingresaCodigo() {
    this.formCodigo = true
    this.myFormCodigopatchValue()
  }

  myFormCodigopatchValue(){
    this.myFormCodigo.patchValue({
      newusuario: this._prestadorPrvdr.nuevo_usuario
    })
  }
}

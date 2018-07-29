import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutenticacionProvider } from '../../../providers/autenticacion/autenticacion';
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
  public usuario:string
  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _autenticacionPrvdr: AutenticacionProvider,
    private formBuilder: FormBuilder) {
    this.usuario = this.navParams.get('usuario')
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivarPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      email: [this.usuario, Validators.compose([Validators.required, Validators.email])],
      codigo: ['', Validators.compose([Validators.required])]
    });
  }

  public activarCuenta(): void {
    if (this.myForm.valid) {
      this._autenticacionPrvdr.activarCuenta(this.myForm.value["email"], this.myForm.value["codigo"])
    }
  }

}

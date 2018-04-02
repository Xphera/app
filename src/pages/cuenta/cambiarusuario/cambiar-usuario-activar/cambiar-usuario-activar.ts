import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteProvider } from '../../../../providers/cliente/cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the CambiarUsuarioActivarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-usuario-activar',
  templateUrl: 'cambiar-usuario-activar.html',
})
export class CambiarUsuarioActivarPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _clientePrvdr: ClienteProvider,
    private formBuilder: FormBuilder) {

    this.myForm = this.createMyForm();
    this._clientePrvdr.obetenerNuevoUsuario().then(
      (resp: any) => {
        this.myForm.setValue({
          'newusuario': resp.data,
          'codigo': ''
        });
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarUsuarioActivarPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      newusuario: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([Validators.required])],
    });
  }

  guardar() {
    if (this.myForm.valid) {
      this._clientePrvdr.cambioUsuarioValidarCodigo(this.myForm.value)
        .subscribe((resp:boolean) => {
          console.log(resp)
            if(resp == true){
                this.navCtrl.setRoot('HomePage')
            }
        })
    }
  }

}

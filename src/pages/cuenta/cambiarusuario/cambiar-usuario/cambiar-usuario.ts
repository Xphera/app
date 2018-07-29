import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteProvider } from '../../../../providers/cliente/cliente';

/**
 * Generated class for the CambiarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-usuario',
  templateUrl: 'cambiar-usuario.html',
})
export class CambiarUsuarioPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private _clientePrvdr: ClienteProvider) {

    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarUsuarioPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newusuario: ['', Validators.compose([Validators.required])],
    });
  }

  guardar() {
    if (this.myForm.valid) {
      this._clientePrvdr.cambioUsuario(this.myForm.value)
        .subscribe((resp) => {
          this.cambiarPagina('CambiarUsuarioActivarPage');
        })
    }
  }

  cambiarPagina(pagina: string) {
    this.navCtrl.push(pagina);
  }

}

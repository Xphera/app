import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the ModalFinalizarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-finalizar-sesion',
  templateUrl: 'modal-finalizar-sesion.html',
})
export class ModalFinalizarSesionPage {
  public myForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
    // this.myForm.controls['novedad'].setValidators([this.conNovedad])


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalFinalizarSesionPage');
  }



  guardar() {
      if (this.myForm.valid) {
        this.viewCtrl.dismiss(this.myForm.value)
      }
  }


  createMyForm() {

    return this.formBuilder.group({
      tipo: ['', [Validators.required]],
      // TODO:  validacion de con novedad
      novedad: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    });
  }

  conNovedad(control: FormControl): { [s: string]: boolean } {
    this.myForm
    if (control.value.length == 0) {
      return { conNovedad: true }
    }
    return null
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

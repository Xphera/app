import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ComplementoUbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complemento-ubicacion',
  templateUrl: 'complemento-ubicacion.html',
})
export class ComplementoUbicacionPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

    this.myForm = this.createMyForm();
     this.myForm.setValue(this.navParams.get('ubicacion'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplementoUbicacionPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      direccion: ['', Validators.compose([Validators.required,Validators.maxLength(50)])],
      complemento:['', Validators.compose([Validators.maxLength(50)])]
    });
  }

  guardar(){
    if(this.myForm.valid){
      this.viewCtrl.dismiss(this.myForm.value);
    }
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

}

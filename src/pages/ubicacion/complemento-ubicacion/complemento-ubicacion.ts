import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UbicacionesProvider } from '../../../providers/ubicaciones/ubicaciones';

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
  coordendas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ubicacionesPrvdr: UbicacionesProvider,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

    this.coordendas = this.navParams.get('coordendas')

    this.myForm = this.createMyForm();
    this.myForm.setValue({
      titulo: this.coordendas.titulo,
      direccion: this.coordendas.direccion,
      complemento: this.coordendas.complemento
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplementoUbicacionPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      direccion: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      complemento: ['', Validators.compose([Validators.maxLength(50)])]
    });
  }

  cerrarModal(){
    this.viewCtrl.dismiss(false);
  }

  guardar() {
    if (this.myForm.valid) {
      this.coordendas.titulo = this.myForm.value.titulo
      this.coordendas.direccion = this.myForm.value.direccion
      this.coordendas.complemento = this.myForm.value.complemento
      //editar
      if (this.coordendas.index >= 0) {

        this._ubicacionesPrvdr.editarUbicacion(this.coordendas)
          .subscribe((resp) => {
            if (resp) {
              //this.navCtrl.setRoot('UbicacionesPage');
              this.viewCtrl.dismiss(true);
            }
          });
      } else {
        //crear
        this._ubicacionesPrvdr.guardarUbicacion(this.coordendas)
          .subscribe((resp) => {
            if (resp) {
              //this.navCtrl.setRoot('UbicacionesPage');
              this.viewCtrl.dismiss(true);
            }
          });
      }

    }
  }


}

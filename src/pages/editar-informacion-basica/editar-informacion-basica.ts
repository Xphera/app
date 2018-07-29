import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';

/**
 * Generated class for the EditarInformacionBasicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-informacion-basica',
  templateUrl: 'editar-informacion-basica.html',
})
export class EditarInformacionBasicaPage {
  public myForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public _prestadorPrvdr: PrestadorProvider,
    private formBuilder: FormBuilder,
    public ionicComponentPrvdr: IonicComponentProvider,
  ) {
        this.myForm = this.createMyForm();
        this.myForm.patchValue({
          direccion: this._prestadorPrvdr.prestador.direccion,
          telefono: this._prestadorPrvdr.prestador.telefono,
          fechaNacimiento: this._prestadorPrvdr.prestador.fechaNacimiento
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarInformacionBasicaPage');


  }

  createMyForm() {
    return this.formBuilder.group({
      telefono: ['', [Validators.required, Validators.pattern("^\\(?(\\+57)?\\)?[- ]?([1-9])?(3[0-9]{2})?[- ]?[1-9][0-9]{2}[- ]?[0-9]{2}[- ]?[0-9]{2}$")]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  guardar() {
    if (this.myForm.valid) {
      this._prestadorPrvdr.editarInfoBasica(this.myForm.value)
      .subscribe((resp:any)=>{
        if(resp["estado"] == "ok"){
          this.dismiss()
          this.ionicComponentPrvdr.showLongToastMessage('Información básica guardada.')
        }
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

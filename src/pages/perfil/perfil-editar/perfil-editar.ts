import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../models/models.index';
import { ClienteProvider } from '../../../providers/cliente/cliente';

/**
 * Generated class for the PerfilEditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-editar',
  templateUrl: 'perfil-editar.html',
})
export class PerfilEditarPage {

  myForm: FormGroup;
  cliente;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    private _clientePrvdr: ClienteProvider) {

    this.cliente = this.navParams.get('cliente');
    // delete this.cliente.email;

    this.myForm = this.createMyForm();
    this.myForm.setValue(this.cliente);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEditarPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      fechaNacimiento: [''],
      nombres: ['', Validators.compose([Validators.maxLength(80), Validators.pattern("^[A-zñÑáéíóúÁÉÍÓÚ0-9 ]+$")])],
      numeroDocumento: ['', Validators.compose([Validators.maxLength(11)])],
      primerApellido: ['', Validators.compose([Validators.maxLength(80), Validators.pattern("^[A-zñÑáéíóúÁÉÍÓÚ0-9 ]+$")])],
      segundoApellido: ['', Validators.compose([Validators.maxLength(80), Validators.pattern("^[A-zñÑáéíóúÁÉÍÓÚ0-9 ]+$")])],
      sexo: [''],
      telefono: ['', Validators.pattern("^\\(?(\\+57)?\\)?[- ]?([1-9])?(3[0-9]{2})?[- ]?[1-9][0-9]{2}[- ]?[0-9]{2}[- ]?[0-9]{2}$")],
      tipoDocumento: [''],
      email: [''],
    });
  }

  guardar() {
    if (this.myForm.valid) {
      this._clientePrvdr.guardar(this.myForm.value).subscribe((resp: boolean) => {
        console.log(resp,'resp');
        if (resp == true) {
          console.log(resp,'resp');
          this.cerrarModal();
        }
      });
    }
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

}

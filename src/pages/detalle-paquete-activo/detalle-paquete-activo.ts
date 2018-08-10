import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PaqueteActivo } from '../../models/models.index';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the DetallePaqueteActivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-paquete-activo',
  templateUrl: 'detalle-paquete-activo.html',
})
export class DetallePaqueteActivoPage {
  public paqueteActivo: PaqueteActivo = new PaqueteActivo()
  public accionPaquete = 'activo';
  public myForm: FormGroup;
  private watch: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _usuariosPrvdr: UsuariosProvider,
    public _ionicComponentPrvdr: IonicComponentProvider,
    private formBuilder: FormBuilder
  ) {

    this.myForm = this.createMyForm();
    let paquete = this.navParams.get("paquete")
    if (paquete != undefined) {
      this.paqueteActivo = paquete;
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter DetalleSesionPage');
    this.watch = this._usuariosPrvdr.paqueteActivoSubject.subscribe((paquete:any)=>{
      this.paqueteActivo = paquete;
    })
  }

  ionViewWillLeave() {
    this.watch.unsubscribe()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleSesionesCompradasPage');
  }

  guardar() {
    if (this.myForm.valid) {
      this._usuariosPrvdr.cancelarPaquete({ 'motivoCancelacion': this.myForm.value["motivoCancelacion"], 'paqueteId': this.paqueteActivo.id })
        .subscribe((resp) => {
          if (resp == 'ok') {
            this._usuariosPrvdr.paqueteActivo = new PaqueteActivo()
            this._ionicComponentPrvdr.showLongToastMessage('Paquete cancelado.')
            this.navCtrl.popToRoot()
          }
        })
    }
  }

  createMyForm() {
    return this.formBuilder.group({
      motivoCancelacion: ['', [Validators.minLength(10), Validators.maxLength(200), Validators.required]]
    });
  }

  detalleSesion(event) {
    this.navCtrl.push('DetalleSesionPage', { sesion: event.sesion })
  }

  cancelarSesion(event) {
    this._usuariosPrvdr.cancelarSesionAlert(event)
  }

  reprogramarSesion(event) {
    this.programarSesion(event)
  }

  programarSesion(event) {
    this._usuariosPrvdr.programarSesionModalOpen(event)
  }

  chat(compraDetalleId){
     this.navCtrl.push('MensajePage', { compraDetalleId: compraDetalleId });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UbicacionesProvider } from '../../../providers/ubicaciones/ubicaciones';
import { IonicComponentProvider } from '../../../providers/ionic-component/ionic-component';


/**
 * Generated class for the UbicacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicaciones',
  templateUrl: 'ubicaciones.html',
})
export class UbicacionesPage {

  mostrarBorrar: boolean = false;
  coordendas;
  mostrarmapa: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ubicacionesPrvdr: UbicacionesProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    private modalCtrl: ModalController) {
    this._ubicacionesPrvdr.obtenerUbicaciones();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicacionesPage');
  }

  coordenadas(event): void {
    
    if (event.coordenadas.index >= 0) {
      this.mostrarBorrar = true;
    } else {
      this.mostrarBorrar = false;
    }

    if (this.mostrarmapa) {
      this.coordendas = event.coordenadas;
    }
    console.log(this.coordendas,this.mostrarmapa);
  }

  eliminar() {

    this._ionicComponentPrvdr.showAlert({
      title: 'Ubicación',
      message: '¿eliminar ubicación ' + this.coordendas.titulo + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.confirmarEliminar();
          }
        }
      ]
    });

  }

  confirmarEliminar() {

    this._ubicacionesPrvdr.eliminarUbicacion(this.coordendas)
      .subscribe((resp) => {
        if (resp) {
          this.navCtrl.setRoot('UbicacionesPage');
        }
      });
  }

  guardar() {
    this.mostrarmapa = false;
    let modal = this.modalCtrl.create('ComplementoUbicacionPage', { coordendas: this.coordendas });
    modal.present();
    modal.onDidDismiss(data => {
      if(data){
        this.navCtrl.setRoot('UbicacionesPage');
      }
      this.mostrarmapa = true;
    });
  }

}

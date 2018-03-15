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
  mostrarmapa:boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ubicacionesPrvdr: UbicacionesProvider,
    private modalCtrl: ModalController,
    private _ionicComponentPrvdr:IonicComponentProvider) {
    this._ubicacionesPrvdr.obtenerUbicaciones();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicacionesPage');
  }

  coordenadas(event): void {
    this.coordendas = event.coordenadas;
    if (event.coordenadas.index >= 0) {
      this.mostrarBorrar = true;
    } else {
      this.mostrarBorrar = false;
    }


  }

  eliminar() {

    this._ionicComponentPrvdr.showAlert({
      title: 'Ubicación',
      message: '¿eliminar ubicación '+this.coordendas.titulo+'?',
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

  confirmarEliminar(){
    let id: number = this._ubicacionesPrvdr.ubicaciones[this.coordendas.index].id;
    this._ubicacionesPrvdr.eliminarUbicacion(id, this.coordendas.index)
      .subscribe((resp) => {
        if (!resp) {
          this.navCtrl.setRoot('UbicacionesPage');
        }
      });

  }

  guardar() {
    this.mostrarmapa = false;
    console.log(this.coordendas);
    let modal = this.modalCtrl.create('ComplementoUbicacionPage', {
      ubicacion: {
        titulo: this.coordendas.titulo,
        direccion: this.coordendas.direccion,
        complemento: this.coordendas.complemento
      },
    });

    modal.present();

    modal.onDidDismiss(data => {
      this.mostrarmapa = true;
      if (data != undefined) {

        this.coordendas.titulo = data.titulo;
        this.coordendas.direccion = data.direccion;
        this.coordendas.complemento = data.complemento;
        //editar
        if (this.coordendas.index >= 0) {
          let id: number = this._ubicacionesPrvdr.ubicaciones[this.coordendas.index].id;
          this._ubicacionesPrvdr.editarUbicacion(id, this.coordendas)
            .subscribe((resp) => {
              if (!resp) {
                this.navCtrl.setRoot('UbicacionesPage');
              }
            });
        } else {
          //crear
          this._ubicacionesPrvdr.guardarUbicacion(this.coordendas)
            .subscribe((resp) => {
              if (!resp) {
                this.navCtrl.setRoot('UbicacionesPage');
              }
            });
        }
      }

    });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionesProvider } from '../../providers/ubicaciones/ubicaciones';
import { Servicio, Asociado } from '../../models/models.index';
import { AsociadosProvider } from '../../providers/asociados/asociados';

import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
/**
 * Generated class for the ServicioUbicacionPrestadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicio-ubicacion-prestador',
  templateUrl: 'servicio-ubicacion-prestador.html',
})
export class ServicioUbicacionPrestadorPage {

  public coordendas;
  public mostrarmapa: boolean = true;
  servicio: Servicio = new Servicio();
  asociados: Array<Asociado> = new Array<Asociado>()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ubicacionesPrvdr: UbicacionesProvider,
    private _asociadosPrvr: AsociadosProvider,
    public _ionicComponentPrvdr: IonicComponentProvider) {

    this.servicio = this.navParams.get('servicio');
    this._ubicacionesPrvdr.obtenerUbicaciones()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalUbicacionesPage');
    this._ionicComponentPrvdr.showAlert({
      title: '',
      subTitle: 'Selecciona el lugar en el cual quieres ver los prestadores disponibles',
      buttons: ['Aceptar']
    })
  }

  continuar(asociados) {
    this.navCtrl.push('AsociadosPage', { asociados });
    // let data = {
    //   servicio: this.servicio.id,
    //   longitud: this.coordendas.longitud,
    //   latitud: this.coordendas.latitud
    // }
    // this._asociadosPrvr.obtenerAsociadosServicios(data)
    // console.log(this._asociadosPrvr.asociados)
  }

  coordenadas(event): void {
    this.coordendas = event.coordenadas;
    let data = {
      servicio: this.servicio.id,
      longitud: this.coordendas.longitud,
      latitud: this.coordendas.latitud
    }
    this._asociadosPrvr.obtenerAsociadosServicios(data)
      .subscribe((data: Asociado[]) => {
        this.asociados = data

      })
  }

}

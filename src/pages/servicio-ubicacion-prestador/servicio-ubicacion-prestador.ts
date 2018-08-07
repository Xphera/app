import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionesProvider } from '../../providers/ubicaciones/ubicaciones';
import { Servicio, Asociado } from '../../models/models.index';
import { AsociadosProvider } from '../../providers/asociados/asociados';

import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';

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
  public mosatarBotonMapa:boolean = false
  servicio: Servicio = new Servicio();
  asociados: Array<Asociado> = new Array<Asociado>()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ubicacionesPrvdr: UbicacionesProvider,
    private _asociadosPrvr: AsociadosProvider,
    public _ionicComponentPrvdr: IonicComponentProvider,
    public _autenticacionPrvdr: AutenticacionProvider) {
      this.servicio = this.navParams.get('servicio');
      this._asociadosPrvr.obtenerZonaServicios({ servicio: this.servicio.id })
  }

  ionViewCanEnter() {
    return this._autenticacionPrvdr.guardian('ServicioUbicacionPrestadorPage', this.navParams.data)
  }

  ionViewDidLoad() {
    this._ubicacionesPrvdr.obtenerUbicaciones()
    this._ionicComponentPrvdr.showAlert({
      title: '',
      subTitle: 'Selecciona el lugar en el cual quieres ver los prestadores disponibles',
      buttons: ['Aceptar']
    })
  }

  continuar(asociados) {
    this.navCtrl.push('AsociadosPage', { asociados });
  }

  coordenadas(event): void {
    this.mosatarBotonMapa = false
    if (event.coordenadas.error == false) {
      this.mosatarBotonMapa = true
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

}

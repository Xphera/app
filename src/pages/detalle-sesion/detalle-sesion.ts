import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Sesion } from '../../models/models.index';
import { CONFIG } from '../../config/comunes.config';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import ol from 'openlayers';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
import { LocalizarUbicacionProvider } from '../../providers/localizar-ubicacion/localizar-ubicacion';

import { Observable } from 'Rxjs/rx';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the DetalleSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-sesion',
  templateUrl: 'detalle-sesion.html',
})
export class DetalleSesionPage {
  public sesion: Sesion
  CONFIG = CONFIG;
  private map: ol.Map
  private raster = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  public vectorSource = new ol.source.Vector();

  public vectorLayer = new ol.layer.Vector({
    source: this.vectorSource,
  });

  public vectorSourceLocalizacion = new ol.source.Vector();

  public vectorLayerLocalizacion = new ol.layer.Vector({
    source: this.vectorSourceLocalizacion,
  });

  public sesionPorIniciar: boolean
  public diferenciaHora: boolean
  public sesionnoIniciada: boolean

  drawerOptions: any;

  private watch: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosPrvdr: UsuariosProvider,
    private _localizarUbicacionPrvdr: LocalizarUbicacionProvider,
    private _ionicComponentPrvdr: IonicComponentProvider,
    public modalCtrl: ModalController) {
    this.sesion = this.navParams.get('sesion');
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true,
      showTitle: "Detalle sesión",
      hideTitle: "Detalle sesión",
    };








  }

  inicio(){
    this.watch = Observable.interval(1000).subscribe(() => {
      this._usuariosPrvdr.obetenerPaqueteActivos()
      this.sesion = this._usuariosPrvdr.paqueteActivo.compradetallesesiones.find(
        (data) => {
          if (data.sesionId == this.sesion.sesionId) {
            return true
          }
        });

      this.sesionPorIniciar = this._usuariosPrvdr.sesionPorIniciar(this.sesion.fechaInicio)
      this.diferenciaHora = this._usuariosPrvdr.diferenciaHora(this.sesion.fechaInicio)
      this.sesionnoIniciada = this._usuariosPrvdr.sesionnoIniciada(this.sesion) && (this.sesion.estado.id == 2 || this.sesion.estado.id == 4)


      if (this._usuariosPrvdr.localizar(this.sesion)) {
        this._localizarUbicacionPrvdr.localizar();
        this.ubicarPuntos();
      }

      if (this.sesion.estado.id == 5) {
        this._localizarUbicacionPrvdr.deterner()
        //limpiar puntos en mapa
        this.vectorLayerLocalizacion.getSource().clear()
      }


    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleSesionPage');
    this.inicio();
    this.loadMap();
  }

  ionViewWillLeave() {
    this._localizarUbicacionPrvdr.deterner()
    this.watch.unsubscribe()
  }


  reprogramarSesion(sesion) {
    this._usuariosPrvdr.programarSesionModalOpen(sesion)
  }

  loadMap() {

    this.map = new ol.Map({
      controls: [],
      layers: [this.raster, this.vectorLayer, this.vectorLayerLocalizacion],
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [this.sesion.ubicacion.longitud, this.sesion.ubicacion.latitud],
        zoom: 17
      }),
      interactions: ol.interaction.defaults({
        dragPan: false,
        pinchRotate: false,
        keyboardPan: false,
        doubleClickZoom: false,
        pinchZoom: false,
        keyboardZoom: false,
        mouseWheelZoom: false,
        dragZoom: false,
      }),
    });

    this.addPoint(this.sesion.ubicacion.longitud, this.sesion.ubicacion.latitud, this.vectorSource, 'pin-export.png')

  }

  addPoint(longitud, latitud, vector, icono) {
    let iconFeature = new ol.Feature({
      geometry: new ol.geom.Point([longitud, latitud]),
    });

    iconFeature.setStyle(new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        crossOrigin: 'anonymous',
        src: 'assets/imgs/markerMap/' + icono
      }))
    }));

    vector.addFeature(iconFeature);
  }

  ubicarPuntos() {
    this.vectorLayerLocalizacion.getSource().clear()
    console.log(this._localizarUbicacionPrvdr.usuario)
    this.addPoint(this._localizarUbicacionPrvdr.usuario.lng, this._localizarUbicacionPrvdr.usuario.lat, this.vectorSourceLocalizacion, 'male-2.png');
    this.addPoint(this._localizarUbicacionPrvdr.prestador.lng, this._localizarUbicacionPrvdr.prestador.lat, this.vectorSourceLocalizacion, 'expert.png');
    this._localizarUbicacionPrvdr.prestador
  }

  calificarSesion(){
    if (this.sesion.estado.id == 3 && this.sesion.calificacion == 0) {
      this.navCtrl.push('ModalCalificacionPage', { sesion: this.sesion })
    }
  }

}

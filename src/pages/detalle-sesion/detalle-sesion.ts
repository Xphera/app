import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Sesion } from '../../models/models.index';
import { CONFIG } from '../../config/comunes.config';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import ol from 'openlayers';
import { LocalizarUbicacionProvider } from '../../providers/localizar-ubicacion/localizar-ubicacion';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
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
    public _ionicComponentPrvdr:IonicComponentProvider,
    public modalCtrl: ModalController) {
    this.sesion = this.navParams.get('sesion');
    this.drawerOptions = {
      handleHeight: 0,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true,
      showTitle: "Detalle sesión",
      hideTitle: "Detalle sesión",
    };

  }

  inicio(){  
      this.sesionPorIniciar = this._usuariosPrvdr.sesionPorIniciar(this.sesion)
      this.diferenciaHora = this._usuariosPrvdr.diferenciaHora(this.sesion.fechaInicio)
      this.sesionnoIniciada = this._usuariosPrvdr.sesionnoIniciada(this.sesion) && (this.sesion.estado.id == 2 || this.sesion.estado.id == 4)
      this.loadMap();

      // if (this._usuariosPrvdr.localizar(this.sesion)) {
      //   this._localizarUbicacionPrvdr.localizar();
      //   this.ubicarPuntos();
      // }
      // if (this.sesion.estado.id == 5) {
      //   this._localizarUbicacionPrvdr.deterner()
      //   //limpiar puntos en mapa
      //   this.vectorLayerLocalizacion.getSource().clear()
      // }
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter DetalleSesionPage');
    this.inicio();
    this.watch = this._usuariosPrvdr.sesionSubject.subscribe((sesion:Sesion)=>{
        if(this.sesion.sesionId == sesion.sesionId){
          this.sesion = sesion
          this.inicio()
        }

      // this.sesion = sesion
      // this.inicio()
      // let sesionId = this.sesion.sesionId
      // let sesion = paquete.compradetallesesiones.find(
      //   (sesion:any) => {
      //     if (sesion.sesionId == sesionId) {
      //       return true
      //     }
      //   });
      //   if(sesion != undefined){
      //     this.sesion = sesion
      //     this.inicio()
      //   }
    })


  }

  ionViewWillLeave() {
    // this._localizarUbicacionPrvdr.deterner()
    this.watch.unsubscribe()
  }


  reprogramarSesion(sesion) {
    this._usuariosPrvdr.programarSesionModalOpen(sesion)
  }

  loadMap() {
    console.log(this.sesion.ubicacion)
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
    this.addPoint(this._localizarUbicacionPrvdr.usuario.lng, this._localizarUbicacionPrvdr.usuario.lat, this.vectorSourceLocalizacion, 'male-2.png');
    this.addPoint(this._localizarUbicacionPrvdr.prestador.lng, this._localizarUbicacionPrvdr.prestador.lat, this.vectorSourceLocalizacion, 'expert.png');
  }

  calificarSesion(){
    if (this.sesion.estado.id == 3 && this.sesion.calificacion == 0) {
      this.navCtrl.push('ModalCalificacionPage', { sesion: this.sesion })
    }
  }

}

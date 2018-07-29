import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import ol from 'openlayers';
import { ZonaProvider } from '../../providers/zona/zona';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
/**
 * Generated class for the ZonaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zona',
  templateUrl: 'zona.html',
})
export class ZonaPage {

  public selectZona: number
  private dataGeoJson
  private map: ol.Map
  public dataGeoJsonSeleccionado

  public vectorSource = new ol.source.Vector();

  public vectorLayer = new ol.layer.Vector({
    source: this.vectorSource,
    style: ((feature, resolution) => {
      let style = new ol.style.Style({
        fill: new ol.style.Fill({
          color: feature.get('color')
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2
        }),
        text: new ol.style.Text({
          font: '15px Calibri,sans-serif',
          // overflow: 'true',
          text: feature.get('name'),
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        }),
      })
      return style
    })
  });

  private raster = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _zonaPrvdr: ZonaProvider,
    public ionicComponentPrvdr: IonicComponentProvider,
  public _prestadorPrvdr:PrestadorProvider ) {

  }



  ionViewDidLoad() {
    this.loadMap();
    this._zonaPrvdr.obtenerZona()
      .subscribe((data) => {
        if (Object.keys(data).length > 0) {
          this.dataGeoJson = new ol.format.GeoJSON().readFeatures(data)
          // buscar zona prestadores
          this._prestadorPrvdr.zonaPrestador()
            .subscribe((zona: any) => {
              let id: number
              let p = this.dataGeoJson.find((data: any, index: number) => {
                if (data.getId() == zona.id) {
                  id = index
                  return data
                }
              })
              if (id != undefined) {
                this.selectZona = id
                this.pintarZona(p)
              }

            })

        }
      })



  }

  pintarZona(geodata) {
    this.vectorSource.clear();
    this.vectorSource.addFeature(geodata);
    let extent = geodata.getGeometry().getExtent();
    this.map.getView().setCenter((ol.extent).getCenter(extent));
    this.map.getView().setZoom(12);
    this.dataGeoJsonSeleccionado = geodata;
    (new ol.format.GeoJSON()).writeFeature(geodata);
  }



  loadMap() {
    this.map = new ol.Map({
      layers: [this.raster, this.vectorLayer],
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 12
      })
    });
  }

  onSelectChange(selectedValue: any) {
    this.pintarZona(this.dataGeoJson[selectedValue])
  }

  guardar() {
    let geodata = (new ol.format.GeoJSON()).writeFeature(this.dataGeoJsonSeleccionado)
    this._prestadorPrvdr.guardarZona(geodata)
      .subscribe((data) => {
        this.ionicComponentPrvdr.showLongToastMessage('Zona guardada.')
      })
  }

}

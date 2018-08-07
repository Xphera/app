import { Component, Input, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { getDistance } from 'ol/sphere';
import { Fill, Style, } from 'ol/style';//Stroke, Text
import { getCenter } from 'ol/extent';


import { MapsAPILoader } from '@agm/core';

import { Observable } from 'rxjs/Rx';

import { Geolocation } from '@ionic-native/geolocation';
import { ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the XphMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-map',
  templateUrl: 'xph-map.html'
})
export class XphMapComponent {
  @ViewChild('mapa') mapa: any;
    @Input() streetViewControl: boolean = false;
    @Input() zoomControl: boolean = false;
    @Input() fullscreenControl: boolean = false;
    @Input() mapTypeControl: boolean = false;
    @Input() listadoubicaciones: boolean = true
    @Input() zoom: number = 17;
    @Input() latitud: number = 0;
    @Input() longitud: number = 0;
    @Input() direccion: string = '';
    @Input() ubicaciones: coordenadasInterfaces[] = [];
    @Input() zona: Array<any> = new Array()
    @Input() PrestadoresPorZona: Array<any> = new Array()

    @Output() getCoordenadas = new EventEmitter();

    private raster = new TileLayer({
      source: new OSM()
    });
    private vectorSource = new Vector();
    public vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: ((feature, resolution) => {
        let style = new Style({
          fill: new Fill({
            color: 'rgba(75, 131, 192, 0.3)'
          }),
        })
        return style
      })
    });
    private map: Map

    private debounceTimeValue = 500;


    /**
  *objeto AutocompleteService de google maps
  */
    acService: any;

    /**
  * referencia a caja de texto de searchbar.
  */
    inputsearchbar: any;

    /**
    *listado de items de precdiccion de google maps
    */
    autocompleteItems: any[] = [];


    /**
  *objerto google.maps.places.PlacesService
  */
    placesService: any;

    /**
    * contiene la lomgitud latitud y la direccion del punto seleccionado.
    */
    coordenadas: coordenadasInterfaces;

    /**
   * indentifica si la ubicacion fue recalculado manualmente por usuario.
   */
    recalculada: boolean;

    activo: boolean = true;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private geolocation: Geolocation,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      public actionsheetCtrl: ActionSheetController
    ) {
      console.log('Hello MapComponent Component');

      this.coordenadas = {
        latitud: this.latitud,
        longitud: this.longitud,
        direccion: this.direccion,
        error: false
      };

    }

    ngOnInit() {
      this.mapInit()
    }

    ngOnChanges(changes: SimpleChanges) {
      // TODO: revisar valor de listadoubicaciones
      this.listadoubicaciones = true
      this.pintarZona();
      if(changes["ubicaciones"]){
        this.ubicaciones = changes["ubicaciones"]["currentValue"]
      }
      console.log(changes)
    }


    openMenuZona() {

      if (this.PrestadoresPorZona.length > 0) {
        let buttons = []
        buttons.push({
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        })
        for (let zona in this.PrestadoresPorZona) {
          buttons.push({
            text: this.PrestadoresPorZona[zona]["name"] + " ( " + this.PrestadoresPorZona[zona]["catidadPrestadores"] + " )",
            icon: 'pin',
            handler: () => {
              let z = this.vectorSource.getFeatures()
                .find((data: any, index: number) => {
                  console.log(zona)
                  if (data.getId() == this.PrestadoresPorZona[zona]["zonaId"]){
                    return data
                  }
                })
              this.map.getView().setZoom(12)
              let centroZona = getCenter(z.getGeometry().getExtent())
              this.cambiarcentroMapa(centroZona[0], centroZona[1])
            }
          })
        }


        let actionSheet = this.actionsheetCtrl.create({
          title: 'Prestadores por Zona',
          cssClass: 'action-sheets-basic-page',
          buttons: buttons
        });
        actionSheet.present();
      }


    }


    /**
      * obtiene ubicacion de usuario.
      */
    fijarUbicacion() {
      this.inputsearchbar[0].disabled = true;
      this.listadoubicaciones = false;

      let loader = this.showloader('Buscando ubicación...');

      loader.present();
      this.geolocation.getCurrentPosition({ timeout: 20000 })
        .then(
          location => {
            this.coordenadas.longitud = location.coords.longitude;
            this.coordenadas.latitud = location.coords.latitude;
            this.coordenadas.error = false;
            this.coordenadas.index = -1;
            this.coordenadas.titulo = '';
            this.coordenadas.complemento = '';
            this.map.getView().setZoom(this.zoom)

            this.geocoder().then((direccion: string) => {
              this.coordenadas.direccion = direccion;
              this.direccion = this.coordenadas.direccion;
              this.cambiarcentroMapa(this.coordenadas.longitud, this.coordenadas.latitud)
              loader.dismiss();
            }).catch(() => {
              loader.dismiss();
            })
          }
        )
        .catch(error => {
          this.coordenadas.longitud = 0;
          this.coordenadas.latitud = 0;
          this.coordenadas.direccion = '';
          this.coordenadas.titulo = '';
          this.coordenadas.id = -1;
          this.coordenadas.error = true;
          this.direccion = ''
          loader.dismiss();
          this.lanzarCoordenadas();
        });
    }


    protected onSelectChange(selectedValue: number, tipo?: string) {
      this.inputsearchbar[0].disabled = true;
      this.listadoubicaciones = false;
      this.autocompleteItems = [];

      this.obtenerUbicacion(selectedValue, tipo)
        .then((resp: coordenadasInterfaces) => {
          this.coordenadas.direccion = resp.direccion;
          this.coordenadas.latitud = parseFloat(resp.latitud)
          this.coordenadas.longitud = parseFloat(resp.longitud);
          this.coordenadas.index = resp.index;
          this.coordenadas.error = false;
          this.map.getView().setZoom(this.zoom)

          if (resp.index >= 0) {
            this.coordenadas.titulo = this.ubicaciones[selectedValue].titulo;
            this.coordenadas.complemento = this.ubicaciones[selectedValue].complemento;
            this.coordenadas.id = this.ubicaciones[selectedValue].id;
          } else {
            this.coordenadas.titulo = '';
            this.coordenadas.complemento = '';
          }

          this.direccion = this.coordenadas.direccion;
          this.cambiarcentroMapa(this.coordenadas.longitud, this.coordenadas.latitud)
        })

    }


    protected cambiarcentroMapa(lon, lat) {
      this.map.getView().setCenter([lon, lat])
    }


    /**
    * obtiene coordendas de un punto seleccionado.
    */
    protected obtenerUbicacion(selectedValue: any, tipo?: string) {

      return new Promise((resolve, reject) => {
        let ubicacion: coordenadasInterfaces = {};
        if (tipo == 'navegacion') {
          let request = {
            placeId: selectedValue.place_id
          };

          this.placesService = new google.maps.places.PlacesService(this.mapa.nativeElement);

          this.placesService.getDetails(request, (place, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              ubicacion.longitud = place.geometry.location.lng();
              ubicacion.latitud = place.geometry.location.lat();
              ubicacion.direccion = selectedValue.description;
              ubicacion.index = -1;
              // ubicacion.titulo = place.formatted_address;
              resolve(ubicacion);
            }
          });
        }
        else {
          ubicacion = this.ubicaciones[selectedValue];
          ubicacion.index = selectedValue;
          resolve(ubicacion);
        }

      });
    }


    /**
  * mustra listado de ubicacion y habilita searchbar.
  */
    protected mostrarListadoUbicacion() {
      this.inputsearchbar[0].disabled = false;
      this.listadoubicaciones = true;
    }


    /**
    * implmenta funcion search() para armar listado de predicciones de direcciones.
    */
    protected updateSearch() {
      if (this.direccion == '') {
        this.autocompleteItems = [];
      } else {
        let config = {
          input: this.direccion,
          componentRestrictions: { country: 'CO' }
        }
        Observable.fromPromise(this.search(config)).debounceTime(this.debounceTimeValue).subscribe((resp: any) => {
          this.autocompleteItems = resp;
        });
      }
    }

    /**
    * consulta listado de predicciones de direcciones.
    */
    search(config) {
      let promesa = new Promise((resolve, reject) => {
        this.acService.getPlacePredictions(config, (predictions, status) => {
          if (predictions === undefined || predictions === null) {
            resolve([]);
          } else {
            let autocompleteItems: any = [];
            for (let prediction of predictions) {
              autocompleteItems.push(prediction);
            }
            resolve(autocompleteItems);
          }
        });
      });
      return promesa;
    }

    /**
  * envia informacion de salida.
  */
    lanzarCoordenadas() {

      this.getCoordenadas.emit({ coordenadas: this.coordenadas, recalculada: this.recalculada });
    }

    protected mapInit() {
      this.inputsearchbar = document.getElementById("inputsearchbar").getElementsByTagName("INPUT");
      // TODO: como quietar esta carga de amg
      this.mapsAPILoader.load().then(() => {
        this.acService = new google.maps.places.AutocompleteService();
      })
      this.pintarMapa()

      /*ultimas cooredenas con geocoder*/
      let coordenadasGeocoder: coordenadasInterfaces = {
        latitud: this.coordenadas.latitud,
        longitud: this.coordenadas.longitud
      }

      this.eventoMapaCambiaCentro(this.map)
        .debounceTime(this.debounceTimeValue)
        .subscribe((result) => {

          if (this.listadoubicaciones === false && this.activo == true) {
            let distanciaCoordenadas = this.getDistanciaMetros(coordenadasGeocoder.latitud, coordenadasGeocoder.longitud, result["latitud"], result["longitud"])
            this.coordenadas.latitud = result["latitud"];
            this.coordenadas.longitud = result["longitud"];
            this.coordenadas.error = false;

            this.recalculada = true;
            if (this.coordenadas.index != -1) {
              if (this.ubicaciones[this.coordenadas.index].longitud == this.coordenadas.longitud && this.ubicaciones[this.coordenadas.index].latitud == this.coordenadas.latitud) {
                this.recalculada = false;
              }
            }

            if (distanciaCoordenadas >= 100 && this.recalculada == true) {
              this.direccion = 'Ubicando....';
              this.geocoder().then((direccion: string) => {
                coordenadasGeocoder = {
                  latitud: this.coordenadas.latitud,
                  longitud: this.coordenadas.longitud
                }
                this.coordenadas.direccion = direccion;
                this.direccion = this.coordenadas.direccion;



                // loader.dismiss();
                this.lanzarCoordenadas();
              }).catch(error => {
                this.coordenadas.error = true;
                this.direccion = '';
                this.pintarMapa();
                // loader.dismiss();
                this.showLongToast({
                  message: 'No se pudo encontrar la ubicación.',
                  duration: 2000
                });
              });

            } else {
              this.coordenadas.error = false;
              this.recalculada = false;
              this.lanzarCoordenadas();
              // loader.dismiss();
            }



          }


        })
    }

    protected pintarMapa() {
      this.map = new Map({
        target: 'mapa',
        layers: [this.raster, this.vectorLayer],
        view: new View({
          center: [0, 0],
          zoom: this.zoom,
          projection: 'EPSG:4326',
        })
      });
      // pintar zonas
      this.pintarZona()
    }

    protected pintarZona() {
      if (this.zona != undefined) {
        if (this.zona.length > 0) {
          this.vectorSource.clear();
          let g = new GeoJSON()
          this.vectorSource.addFeatures(g);
          for (let zona of this.zona) {
            this.vectorSource.addFeatures(g.readFeatures(zona));
          }
        }
      }
    }

    protected eventoMapaCambiaCentro(map) {
      return new Observable(observer => {
        map.on('moveend', (evt) => {
          let center = evt.map.getView().getCenter()
          observer.next({
            'latitud': center[1],
            'longitud': center[0]
          })
        });
      })

    }

    protected sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    /**
  * obtiene nombre de direccion a partir de coordendas.
  */
    geocoder() {
      let promesa = new Promise((resolve, reject) => {
        let geocoder = new google.maps.Geocoder();
        let latlng = { lat: this.coordenadas.latitud, lng: this.coordenadas.longitud };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results[0]['formatted_address']);
          } else {
            reject({ error: status });
          }
        });
      })
      return promesa;
    }

    /**
     * emplementacion de componente toastCtrl.
     */
    showLongToast(confing) {
      this.toastCtrl.create(confing).present();
    }

    /**
    * implementación de componente loadingCtrl.
    */
    showloader(texto) {
      let loader = this.loadingCtrl.create({
        content: texto,
      });
      loader.present();
      return loader;
    }


    getDistanciaMetros(lat1, lon1, lat2, lon2): number {
      return getDistance([lon1, lat1], [lon2, lat2])
    }


  }


  /**
  *Interfaz de coordenadas.
  */
  export interface coordenadasInterfaces {
    latitud?,
    longitud?,
    titulo?: string,
    direccion?: string,
    complemento?: string,
    id?: number,
    /**
    * 0 o mayor indicada que el index del arrego de ubicaciones suministrado si es -1 es una direccion nueva.
    */
    index?: number,
    error?: boolean
  }

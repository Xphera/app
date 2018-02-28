import { Component, ViewChild, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

import { Geolocation } from '@ionic-native/geolocation';

import { ToastController, LoadingController } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';


/**
 * Generated class for the MapMarkerFixedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-map-marker-fixed',
  templateUrl: 'map-marker-fixed.html'
})
export class MapMarkerFixedComponent {


  @ViewChild('gmapfixed') gmapElement: any;
  @Input() streetViewControl: boolean = false;
  @Input() zoomControl: boolean = false;
  @Input() fullscreenControl: boolean = false;
  @Input() mapTypeControl: boolean = false;
  @Input() zoom: number = 15;
  @Input() latitud: number = 0;
  @Input() longitud: number = 0;
  @Input() titulo: string = '';
  @Input() ubicaciones: coordenadasInterfaces[] = [];

  /**
  *listado de items de precdiccion de google maps
  */
  autocompleteItems: any[] = [];

  /**
  *objeto AutocompleteService de google maps
  */
  acService: any;

  /**
  *objeto google.maps.Map
  */
  map: any;

  //mapa: {};
  /**
  *objerto google.maps.places.PlacesService
  */
  placesService: any;

  /**
  * variale para mostrar listado de ubicaciones
  */
  listadoubicaciones: boolean = true;
  /**
  * contiene la lomgitud latitud y el titulo del punto seleccionado.
  */
  coordenadas: coordenadasInterfaces;

  /**
  * indentifica si la ubicacion fue recalculado manualmente por usuario.
  */
  recalculada: boolean;

  /**
  * referencia a caja de texto de searchbar.
  */
  inputsearchbar: any;

  @Output() getCoordenadas = new EventEmitter();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    console.log('Hello MapMarkerFixedComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.inputsearchbar = document.getElementById("inputsearchbar").getElementsByTagName("INPUT");
    this.mapsAPILoader.load().then(() => {
      this.acService = new google.maps.places.AutocompleteService();
      this.coordenadas = {
        latitud: this.latitud,
        longitud: this.longitud,
        titulo: this.titulo
      };
      this.pintarMapa();
    })
  }

  /**
  * mustra listado de ubicacion y habilita searchbar.
  */
  mostrarListadoUbicacion() {
    this.inputsearchbar[0].disabled = false;
    this.listadoubicaciones = true;
  }

  /**
  * envia informacion de salida.
  */
  lanzarCorrdenadas() {
    this.getCoordenadas.emit({ coordenadas: this.coordenadas, recalculada: this.recalculada });
  }

  /**
  * implmenta funcion search() para armar listado de predicciones de direcciones.
  */
  updateSearch() {
    if (this.titulo == '') {
      this.autocompleteItems = [];
    }else{
      let config = {
        //types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.titulo,
        componentRestrictions: { country: 'CO' }
      }
       Observable.fromPromise(this.search(config)).debounceTime(500).subscribe((resp:any)=>{
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
  *
  */
  onSelectChange(selectedValue: any, tipo?: string) {
    this.autocompleteItems = [];
    let loader = this.showloader('Creando Mapa...');
    this.sleep(2000).then(() => {
      this.inputsearchbar[0].disabled = true;
      this.listadoubicaciones = false;
      this.obtenerUbicacion(selectedValue, tipo).then((resp: coordenadasInterfaces) => {
        this.coordenadas.titulo = resp.titulo;
        this.coordenadas.latitud = resp.latitud;
        this.coordenadas.longitud = resp.longitud;
        this.coordenadas.index = resp.index;
        this.titulo = this.coordenadas.titulo;
        this.pintarMapa();
        loader.dismiss();
      });
    })
  }

  /**
  * obtiene coordendas de un punto seleccionado.
  */
  obtenerUbicacion(selectedValue: any, tipo?: string) {
    let promesa = new Promise((resolve, reject) => {
      let ubicacion: coordenadasInterfaces = {};
      if (tipo == 'navegacion') {
        let request = {
          placeId: selectedValue.place_id
        };

        this.placesService = new google.maps.places.PlacesService(this.gmapElement.nativeElement);

        this.placesService.getDetails(request, (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            ubicacion.longitud = place.geometry.location.lng();
            ubicacion.latitud = place.geometry.location.lat();
            ubicacion.titulo = selectedValue.description;
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

    return promesa;
  }

  /**
  * obtiene ubicacion de usuario.
  */
  fijarUbicacion() {
    this.inputsearchbar[0].disabled = true;
    this.listadoubicaciones = false;
    let loader = this.showloader('Buscando ubicación...');

    loader.present();
    this.geolocation.getCurrentPosition({ timeout: 3000 })
      .then(
      location => {
        this.coordenadas.longitud = location.coords.longitude;
        this.coordenadas.latitud = location.coords.latitude;
        this.coordenadas.index = -1;
        this.geocoder().then((titulo: string) => {
          this.coordenadas.titulo = titulo;
          this.titulo = this.coordenadas.titulo;
          this.pintarMapa();
          loader.dismiss();
        })
      }
      )
      .catch(error => {

        loader.dismiss();
        this.showLongToast({
          message: 'No se pudo encontrar la ubicación.',
          duration: 2000
        });
      });
  }

  /**
  * pinta mapa mapa a partir de coorde e implmenta evento al cambiar centro de mapa.
  */
  pintarMapa(): void {
    this.recalculada = false;
    this.lanzarCorrdenadas();
    var mapProp = {
      center: new google.maps.LatLng(this.coordenadas.latitud, this.coordenadas.longitud),
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: this.streetViewControl,
      zoomControl: this.zoomControl,
      fullscreenControl: this.fullscreenControl,
      mapTypeControl: this.mapTypeControl,
      draggable: true
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    /*ultimas cooredenas con geocoder*/
    let coordenadasGeocoder: coordenadasInterfaces = {
      latitud: this.coordenadas.latitud,
      longitud: this.coordenadas.longitud
    }

    this.eventoMapaCambiaCentro(this.map).debounceTime(500).subscribe((result) => {
      if (this.listadoubicaciones === false) {
        let loader = this.showloader('Buscando ubicación...');
        // let distanciaCoordenadas: number = this.getDistanciaMetros(this.map.getCenter().lat(), this.map.getCenter().lng(), this.coordenadas.latitud, this.coordenadas.longitud);
        let distanciaCoordenadas: number = this.getDistanciaMetros(this.map.getCenter().lat(), this.map.getCenter().lng(), coordenadasGeocoder.latitud, coordenadasGeocoder.longitud);
        this.coordenadas.latitud = this.map.getCenter().lat();
        this.coordenadas.longitud = this.map.getCenter().lng();

        if (distanciaCoordenadas >= 100) {
          this.titulo = 'Ubicando....';
          this.geocoder().then((titulo: string) => {

            coordenadasGeocoder = {
              latitud: this.coordenadas.latitud,
              longitud: this.coordenadas.longitud
            }

            this.coordenadas.titulo = titulo;
            this.titulo = this.coordenadas.titulo;
            this.recalculada = true;
            loader.dismiss();
            this.lanzarCorrdenadas();
          }).catch(error => {
            this.pintarMapa();
            loader.dismiss();
            this.showLongToast({
              message: 'No se pudo encontrar la ubicación.',
              duration: 2000
            });
          });
          //console.log(result, 'subscribe', distanciaCoordenadas);
        } else {
          this.lanzarCorrdenadas();
          loader.dismiss();
          //console.log(result, 'no subscribe', distanciaCoordenadas);
        }
      }

    });
    /**------------------    -------------------------*/
    // google.maps.event.addListener(this.map, 'center_changed', () => {
    //   if (this.listadoubicaciones === false) {
    //     cantidadMovimientos += 1;
    //     console.log(cantidadMovimientos);
    //     let loader = this.showloader('Buscando ubicación...');
    //
    //     let distanciaCoordenadas: number = this.getDistanciaMetros(this.map.getCenter().lat(), this.map.getCenter().lng(), this.coordenadas.latitud, this.coordenadas.longitud);
    //
    //     this.coordenadas.latitud = this.map.getCenter().lat();
    //     this.coordenadas.longitud = this.map.getCenter().lng();
    //
    //     if (cantidadMovimientos == 5) {
    //         mapProp.draggable = false;
    //         loader.dismiss();
    //         this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    //     }
    //     else if (distanciaCoordenadas >= 100) {
    //       this.titulo = 'Ubicando....';
    //       this.geocoder().then((titulo: string) => {
    //         this.coordenadas.titulo = titulo;
    //         this.titulo = this.coordenadas.titulo;
    //         this.recalculada = true;
    //         loader.dismiss();
    //         this.lanzarCorrdenadas();
    //       }).catch(error => {
    //         this.pintarMapa();
    //         loader.dismiss();
    //         this.showLongToast({
    //           message: 'No se pudo encontrar la ubicación.',
    //           duration: 2000
    //         });
    //       });
    //
    //     } else {
    //       this.lanzarCorrdenadas();
    //       loader.dismiss();
    //       console.log(distanciaCoordenadas);
    //     }
    //   }
    // });
  }


  eventoMapaCambiaCentro(map) {
    return new Observable(observer => {
      google.maps.event.addListener(map, 'center_changed', () => {
        observer.next({ latitud: map.getCenter().lat(), longitud: map.getCenter().lng() });
        //console.log({ latitud: map.getCenter().lat(), longitud: map.getCenter().lng() });
        //observer.complete();
      })
    })
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
          console.log(results, status);
          reject({ error: status });
        }
      });
    })
    return promesa;
  }


  /**
  * calcula distancia en metros entre dos coordendas.
  */
  getDistanciaMetros(lat1, lon1, lat2, lon2): number {
    let rad = (x) => { return x * Math.PI / 180; }
    const R: number = 6378137; //Radio de la tierra en m
    let dLat: number = rad(lat2 - lat1);
    let dLong: number = rad(lon2 - lon1);
    let a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d: number = R * c;
    return Number(d.toFixed(3)); //Retorna tres decimales
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
  * emplementacion de componente toastCtrl.
  */
  showLongToast(confing) {
    this.toastCtrl.create(confing).present();
  }

  /**
  * emplementacion de componente loadingCtrl.
  */
  showloader(texto) {
    let loader = this.loadingCtrl.create({
      content: texto,
    });
    loader.present();
    return loader;
  }

}





/**
*Interfaz de coordenadas.
*/
export interface coordenadasInterfaces {
  latitud?: number,
  longitud?: number,
  titulo?: string,
  /**
  * 0 o mayor indicada que el index del arrego de ubicaciones suministrado si es -1 es una direccion nueva.
  */
  index?: number
}

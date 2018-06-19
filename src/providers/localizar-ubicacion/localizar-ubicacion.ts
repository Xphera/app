import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';


/*
  Generated class for the LocalizarUbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalizarUbicacionProvider {

  protected lat = 4.6502275
  protected lng = -74.0575201

  private watch: Subscription;
  public usuario: { lat: number, lng: number }
  public prestador: { lat: number, lng: number }
  private ubicacarPrestadorObservable: Subscription

  protected localizando: boolean = false

  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
  ) {
    console.log('Hello LocalizarUbicacionProvider Provider');

  }


  localizar(idPrestador?: number) {
    if (this.localizando == false) {
      this.ubicarUsuario()
      this.ubicacarPrestador()
      this.localizando = true;
    }
  }

  deterner() {
    if (this.localizando == true) {
      this.detenerUbicacarPrestador()
      this.detenerUbicacionUsuario()
      this.localizando = false;
    }
  }

  ubicarUsuario() {
    this.usuario = { lat: 0, lng: 0 }
    this.geolocation.getCurrentPosition({ timeout: 6000 }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.usuario = { lat: resp.coords.latitude, lng: resp.coords.longitude }
      this.watch = this.geolocation.watchPosition()
        .subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
          this.usuario = { lat: data.coords.latitude, lng: data.coords.longitude }
        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  detenerUbicacionUsuario() {

    try {
      this.watch.unsubscribe();
    } catch (e) {
      console.log(JSON.stringify(e));
    }


  }
  // TODO: conectar a servicio lacalizacion prestador
  ubicacarPrestador(idPrestador?: number) {

    this.prestador = { lat: this.lat, lng: this.lng }
    //consulta posición de prestador cada 5 minutos
    this.ubicacarPrestadorObservable = Observable.interval((1000 * 60) * 5).subscribe(() => {
      this.lat = this.lat + 0.0007983
      this.lng = this.lng + 0.0001968
      this.prestador = { lat: this.lat, lng: this.lng }
    });
  }

  detenerUbicacarPrestador() {
    try {
      this.ubicacarPrestadorObservable.unsubscribe();
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }



}

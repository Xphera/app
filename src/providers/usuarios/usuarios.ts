import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_REGISTRO_USUARIO } from '../../config/url.confing';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
//import 'rxjs/add/operator/map';


/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  public ubicaciones: any[] = []

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    console.log('Hello UsuariosProvider Provider');
  }


  obtenerUbicaciones() {
    this.ubicaciones = [
      {
        titulo: 'Parque urbano el Virrey',
        latitud: 4.67424,
        longitud: -74.0563
      },
      {
        titulo: 'Parque Simón Bolívar',
        latitud: 4.6586709,
        longitud: -74.0939604,
      },
      {
        titulo: 'Parque Nacional',
        latitud: 4.6241379,
        longitud: -74.0651253,
      }
    ]

  }

  activarCuenta() {
      let promesa = new Promise((resolve, reject) => {
      let loader = this.showloader("por favor espera...");
      loader.dismiss();
      //respuesta de promesa
      resolve({ activa: true });
    });
    return promesa;
  }

  crearUsario(email: string, passw: string, repassw: string) {
    //crear promesa...
    let promesa = new Promise((resolve, reject) => {

      let loader = this.showloader("por favor espera...");

      //enviar petición a servidor...
      this.http.post(BASE_URL_REGISTRO_USUARIO, { email, passw, repassw })
        //  .map((result: Response)=> result.json())
        .subscribe(
        //repuesta valida de servidor
        data => {
          loader.dismiss();
          this.showLongToast(
            {
              message: 'Cuenta creada, se ha enviado correo electrónico con código para activar cuenta.',
              duration: 6000
            }
          );

          //respuesta de promesa
          resolve({ registro: true });
        },
        //repuesta de error en servidor
        error => {
          let listaerrores: string = '';
          for (let i in error.error) {
            listaerrores = error.error[i];
          }

          loader.dismiss();

          this.showAlert({
            titulo: 'Error!',
            subtitulo: listaerrores,
            buttons: ['OK']
          });
          //respuesta de promesa
          resolve({ registro: false });
        }
        );
    });

    return promesa;
  }

  showLongToast(confing) {
    this.toastCtrl.create(confing).present();
  }

  showAlert(confing) {
    this.alertCtrl.create(confing).present();
  }

  showloader(texto) {
    let loader = this.loadingCtrl.create({
      content: texto,
    });
    loader.present();
    return loader;
  }

}

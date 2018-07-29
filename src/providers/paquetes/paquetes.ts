import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_PAQUETES } from '../../config/url.confing';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { Paquete } from '../../models/models.index';

/*
  Generated class for the PaquetesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaquetesProvider {

  paquetes: Array<Paquete> = new Array<Paquete>();
  key: string = 'paquetes'

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvdr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider) {
    console.log('Hello PaquetesProvider Provider');
  }

  grabarPaquetes() {
    let sesion: object = { 'fecha': '', 'ubicacion': '', latitud: '', longitud: '' };
    let request = this.http.get<Paquete[]>(URL_PAQUETES)

    this._peticionPrvdr.peticion(request)
      .map((data: Paquete[]) => {
        data.map((data: Paquete) => {
          let sesiones = new Array();
          for (let i = 1; i <= parseInt(data.cantidadDeSesiones); i++) {
            sesiones.push(sesion)
          }
          data.sesiones = sesiones;
        });
        return data;
      }).subscribe((data: Paquete[]) => {
        this._almacenamientoPrvdr.guardar(this.key, JSON.stringify(data));
      });
  }


  // obeternerPaqueteCategoria(ids: Array<number>) {
    // this._almacenamientoPrvdr.obtener(this.key)
    //   .then((datos) => {
    //     this.paquetes = JSON.parse(datos['data'])
    //       .filter((paquete: Paquete) => {
    //         if (ids.indexOf(paquete.id) != -1) {
    //           return paquete;
    //         }
    //       });
    //   });

    // this.paquetes = [
    //   {
    //     nombre: "ORO",
    //     detalle: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.",
    //     valor: "800000",
    //     ribbon: { 'text': '-10%', estilo: 'sales' },
    //     sesiones: [
    //       {
    //         ubicacion: '',
    //         fecha: ''
    //       }, {
    //         ubicacion: '',
    //         fecha: ''
    //       }, {
    //         ubicacion: '',
    //         fecha: ''
    //       }, {
    //         ubicacion: '',
    //         fecha: ''
    //       }, {
    //         ubicacion: '',
    //         fecha: ''
    //       }
    //     ]
    //   },
    //   {
    //     nombre: "PLATA",
    //     detalle: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.",
    //     valor: "680000",
    //     ribbon: { 'text': 'nuevo', estilo: 'nuevo' },
    //     sesiones: [
    //       {
    //         ubicacion: '',
    //         fecha: ''
    //       }, {
    //         ubicacion: '',
    //         fecha: ''
    //       }, {
    //         ubicacion: '',
    //         fecha: ''
    //       }
    //     ]
    //   },
    //   {
    //     nombre: "ESMERALDA",
    //     detalle: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.",
    //     valor: "450000",
    //     sesiones: [
    //       {
    //         ubicacion: '',
    //         fecha: ''
    //       }
    //     ]
    //   }
    // ]
  // }

}

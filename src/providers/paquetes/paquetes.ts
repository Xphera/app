import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_PAQUETES } from '../../config/url.confing';
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { Paquete } from '../../models/models.index';

import { CONFIG } from '../../config/comunes.config';

/*
  Generated class for the PaquetesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaquetesProvider {

  paquetes:Array<Paquete>  = new Array<Paquete>();

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvdr: AlmacenamientoProvider
  ) {
    console.log('Hello PaquetesProvider Provider');
  }

  grabarPaquetes() {
    let sesion: object = { 'fecha': '', 'ubicacion': '',estado: CONFIG.ESTADO_SESION.INICIAL ,latitud:'',longitud:'' };
    this.http.get<Paquete[]>(BASE_URL_PAQUETES).map((data: Paquete[]) => {
      data.map((data: Paquete) => {
        let sesiones = new Array();
        for (let i = 1; i <= parseInt(data.cantidadDeSesiones); i++) {
          sesiones.push(sesion)
        }
        data.sesiones = sesiones;
      });
      return data;
    }).subscribe((data: Paquete[]) => {
      this._almacenamientoPrvdr.guardar('paquetes', JSON.stringify(data));
    });
  }


  obeternerPaqueteCategoria(ids: Array<number>) {
    this._almacenamientoPrvdr.obtener('paquetes').then((datos: { satatus: string, data: string }) => {
      this.paquetes = JSON.parse(datos.data).filter((paquete: Paquete) => {
        if (ids.indexOf(paquete.id) != -1) {
          return paquete;
        }
      });
    });

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
  }

}

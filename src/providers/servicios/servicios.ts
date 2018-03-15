import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_SERVICIO } from '../../config/url.confing';
import { Servicio } from '../../models/servicio.model';

import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {

  servicios: Servicio[] = [];

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvdr: AlmacenamientoProvider) {
    console.log('Hello ServiciosProvider Provider');
  }

  public grabarServicios() {
    return this.http.get<Servicio[]>(BASE_URL_SERVICIO).subscribe(data => {
      this._almacenamientoPrvdr.guardar('servicio', JSON.stringify(data)).then(() => {
        this.servicios = data;
      })
    });
  }

  obtenerServicioCategoria(idcategoria: number) {
    this._almacenamientoPrvdr.obtener('servicio').then((datos: { satatus: string, data: string }) => {
      this.servicios = JSON.parse(datos.data).filter((item) => {
        return (item.categoria_id === idcategoria);
      });
    })

    // this.obtenerCategorias()
    //      .subscribe( data =>{
    //        this.servicios = data.filter((item) => {
    //              return (item.categoria_id===idcategoria);
    //          });
    //      });
  }


}

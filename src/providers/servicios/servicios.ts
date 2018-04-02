import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../../config/url.confing';
import { Servicio } from '../../models/servicio.model';

import { PeticionProvider } from '../peticion/peticion';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {

  servicios: Array<Servicio> = new Array<Servicio>();
  key: string = 'servicio'

  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider) {
    console.log('Hello ServiciosProvider Provider');
  }

  public grabarServicios() {
    let request = this.http.get<Servicio[]>(URL_SERVICIO)
    this._peticionPrvdr.peticion(request, this.key)
      .subscribe((resp: Servicio[]) => {
        this.servicios = resp;
      })
  }

  obtenerServicioCategoria(idcategoria: number) {
    this._peticionPrvdr.almacenamiento(this.key)
      .then((datos) => {
        this.servicios = JSON.parse(datos['data']).filter((item) => {
          return (item.categoria_id === idcategoria);
        });
      })
  }
  
}

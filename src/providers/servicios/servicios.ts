import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_SERVICIO } from '../../config/url.confing';
import { Servicio } from '../../models/servicio.model';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {

  servicios:Servicio[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello ServiciosProvider Provider');
    this.obtenerCategorias();
  }

  private obtenerCategorias(){
    return  this.http.get<Servicio[]>(BASE_URL_SERVICIO)
  }

  obtenerServicioCategoria(idcategoria:number){
    this.obtenerCategorias()
         .subscribe( data =>{
           this.servicios = data.filter((item) => {
                 return (item.categoria===idcategoria);
             });
         });
  }


}

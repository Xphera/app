import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the PaquetesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaquetesProvider {

  paquetes:any[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello PaquetesProvider Provider');
  }

  obeternerPaqueteCategoria(){
    this.paquetes=[
      {
        nombre:"ORO",
        detalle:"The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.",
        valor:"800000",
        ribbon:{'text':'-10%',estilo:'sales'},
        sesiones:[
          {
            ubicacion:'',
            fecha:''
          },{
            ubicacion:'',
            fecha:''
          },{
            ubicacion:'',
            fecha:''
          },{
            ubicacion:'',
            fecha:''
          },{
            ubicacion:'',
            fecha:''
          }
        ]
      },
      {
        nombre:"PLATA",
        detalle:"The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.",
        valor:"680000",
        ribbon:{'text':'nuevo',estilo:'nuevo'},
        sesiones:[
          {
            ubicacion:'',
            fecha:''
          },{
            ubicacion:'',
            fecha:''
          },{
            ubicacion:'',
            fecha:''
          }
        ]
      },
      {
        nombre:"ESMERALDA",
        detalle:"The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.",
        valor:"450000",
        sesiones:[
          {
            ubicacion:'',
            fecha:''
          }
        ]
      }
    ]
  }

}

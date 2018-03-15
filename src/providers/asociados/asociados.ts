import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL_ASOCIADOS } from '../../config/url.confing';
import { Asociado } from "../../models/models.index";
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';

/*
  Generated class for the AsociadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AsociadosProvider {

  asociados: Array<Asociado> = new Array<Asociado>();
  agendaasociado: any[] = [];

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvidr: AlmacenamientoProvider
  ) {
    console.log('Hello AsociadosProvider Provider');
    //this.grabarAsociados();
  }

  obtenerAgendaAsociado() {
    let date = new Date();
    let events = [];
    for (let i = 0; i < 15; i += 1) {
      let hora = 5;
      for (let x = 0; x < 9; x += 1) {
        let startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hora, 0);
        let endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hora, 59);
        hora += 1;
        events.push({
          title: '',
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
      date.setDate(date.getDate() + 1);
    }
    this.agendaasociado = events;
  }

  grabarAsociados() {
    this.http.get<Asociado[]>(BASE_URL_ASOCIADOS).map((data: Asociado[]) => {
      data.map((asociado: Asociado) => {
        asociado.nombreCompleto = asociado.nombres + ' ' + asociado.primerApellido + ' ' + asociado.segundoApellido;
        return asociado;
      });
      return data;
    }).subscribe((data: Asociado[]) => {
      this._almacenamientoPrvidr.guardar('asociados', JSON.stringify(data));
    });
  }

  obtenerAsociadosServicios(id: number) {
    this._almacenamientoPrvidr.obtener('asociados').then((datos: { satatus: string, data: string }) => {
      this.asociados = JSON.parse(datos.data).filter((asociado: Asociado) => {
        if (asociado.servicios.indexOf(id) > -1) {
          return asociado;
        }
      });
    });

    // .filter((asociado: Asociado) => {
    //   if (asociado.servicios.indexOf(id) > -1) {
    //     console.log(asociado);
    //     return asociado;
    //   }
    // });

    // this.asociados = [
    //   {
    //     id: 1,
    //     nombre: 'Edward J. Brady',
    //     titulo: 'Profesional en Ciencias del Deporte y la Educación Física',
    //     imagePath: 'https://ionicframework.com/dist/preview-app/www/assets/img/marty-avatar.png',
    //     perfil: " líder e innovador social, que contribuya a la transformación de las comunidades, al potenciar en ellas sus capacidades propias, donde se evidencie la coherencia de sus aprendizajes y de las competencias que se desarrollaron durante su proceso de formación enfatizando el desarrollo humano y social.",
    //     rate: 3,
    //     insignia: 2,
    //     formacion: [
    //       {
    //         titulo: 'Profesional en Ciencias del Deporte y la Educación Física',
    //         institucion: 'Universidad de Cundinamarca - UDEC'
    //       },
    //       {
    //         titulo: 'LICENCIADO EN EDUCACIÓN FÍSICA, RECREACIÓN Y DEPORTES',
    //         institucion: 'Universidad de Cundinamarca - UDEC'
    //       }
    //     ],
    //     comentarios: [
    //       {
    //         paquete: 'Paquete ORO',
    //         avatarusuario: 'https://ionicframework.com/dist/preview-app/www/assets/img/sarah-avatar.png.jpeg',
    //         usuario: 'Sarah Connor',
    //         creado: '11h ago',
    //         comenatrio: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.'
    //       },
    //       {
    //         paquete: 'Paquete ESMERALDA',
    //         avatarusuario: 'https://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-woody.png',
    //         usuario: 'Woody',
    //         creado: '1d ago',
    //         comenatrio: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
    //       }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     nombre: 'Nathan Yudin',
    //     titulo: 'LICENCIADO EN EDUCACIÓN FÍSICA, RECREACIÓN Y DEPORTES',
    //     imagePath: 'https://ionicframework.com/dist/preview-app/www/assets/img/sarah-avatar.png.jpeg',
    //     perfil: "docentes proactivos y de alta sensibilidad social, capaces de conducir y orientar el proceso educativo a través de la actividad física, con la cual se contribuye a la formación integral de la persona en los diferentes niveles y modalidades del sistema educativo.",
    //     rate: 1,
    //     insignia: 0
    //   }
    // ];
  }

}

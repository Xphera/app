import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_ASOCIADOS, URL_DISPONIBILIDAD_MES } from '../../config/url.confing';
import { Asociado } from "../../models/models.index";
import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';
import { PeticionProvider } from '../peticion/peticion';
import { AutenticacionProvider } from '../autenticacion/autenticacion';
import { Observable } from "rxjs/Observable"

/*
  Generated class for the AsociadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AsociadosProvider {

  asociados: Array<Asociado> = new Array<Asociado>();
  key: string = 'asociados'
  agendaasociado;

  constructor(
    public http: HttpClient,
    public _almacenamientoPrvidr: AlmacenamientoProvider,
    private _peticionPrvdr: PeticionProvider,
    private _autenticacionPrvdr: AutenticacionProvider, ) {
    console.log('Hello AsociadosProvider Provider');

  }

  obtenerAgendaAsociado(año,mes,sesionId: number) {
    mes++
    let events:Array<any> = new Array<any>()
    let headers = this._autenticacionPrvdr.gerHeaders();
    let request = this.http.post(URL_DISPONIBILIDAD_MES, { mes,año, sesionId}, { headers })

    return this._peticionPrvdr.peticion(request, this.key)
      .map((resp: Array<Array<{ dia: Date , horas: Array<boolean> }>>) => {
       events = new Array<any>()
        for (let disponibilidad of resp) {
          let dia = new Date(disponibilidad["dia"]);

          for (let hora = 0; hora < Object.keys(disponibilidad["horas"]).length; hora++) {
            if (disponibilidad["horas"][hora]) {
              dia.setHours(hora)
              events.push({
                title: '',
                startTime: new Date(dia.setMinutes(0)),
                endTime: new Date(dia.setMinutes(59)),
                allDay: false,
              });
            }
          }
        }
        return events
      });
}

  grabarAsociados() {
    let request = this.http.get<Asociado[]>(URL_ASOCIADOS)

    this._peticionPrvdr.peticion(request)
      .map((data: Asociado[]) => {
        data.map((asociado: Asociado) => {
          asociado.nombreCompleto = asociado.nombres + ' ' + asociado.primerApellido + ' ' + asociado.segundoApellido;
          return asociado;
        });
        return data;
      }).subscribe((data: Asociado[]) => {
        this._almacenamientoPrvidr.guardar(this.key, JSON.stringify(data));
      });
  }

  obtenerAsociadosServicios(id: number) {
    this._almacenamientoPrvidr.obtener(this.key)
      .then((datos) => {
        this.asociados = JSON.parse(datos['data']).filter((asociado: Asociado) => {
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

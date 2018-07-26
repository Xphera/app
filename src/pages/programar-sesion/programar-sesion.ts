import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AsociadosProvider } from '../../providers/asociados/asociados';
import { UbicacionesProvider } from '../../providers/ubicaciones/ubicaciones';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
import ol from 'openlayers';
import * as moment from 'moment';


/**
 * Generated class for the ProgramarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-programar-sesion',
  templateUrl: 'programar-sesion.html',
})
export class ProgramarSesionPage {

  //variables de calendario
  titulocalendario: string = '';
  calendar: any = {};
  currentDate = new Date()

  //variables de navegacion
  paginas = {
    ubicacion: { titulo: "1. Ubicación", pagina: 'ubicacion' },
    dia: { titulo: "2. Selecciona día", pagina: 'calendarioDia' },
    hora: { titulo: "3. Selecciona hora", pagina: 'calendarioHora' }
  };
  navegacion: string = this.paginas.ubicacion.pagina;
  tituloaccion: string = this.paginas.ubicacion.titulo;

  public mapa: any = {}
  public ubicacion: any = {}
  public botonmapa: boolean = false;
  public sesion
  public eventSource
  public ubicaciones = []
  cambioDemes: boolean

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public _asociadosPrvdr: AsociadosProvider,
    public _ubicacionesPrvdr: UbicacionesProvider,
    private _ionicComponentPrvdr: IonicComponentProvider) {



    this.sesion = this.navParams.get("sesion")

    this.loadEvents(this.currentDate, this.sesion.sesionId)

    this._ubicacionesPrvdr.obtenerUbicaciones()
      .subscribe(() => {


        for (let i in this._ubicacionesPrvdr.ubicaciones) {
          let ubicacionValida = this.ubicacionEnZona(this._ubicacionesPrvdr.ubicaciones[i].longitud,
            this._ubicacionesPrvdr.ubicaciones[i].latitud)
          if (ubicacionValida) {
            this.ubicaciones.push(this._ubicacionesPrvdr.ubicaciones[i])
          }
        }

      });

    this.mapa = {
      zoom: 17,
      zoomControl: false,
      streetViewControl: false,
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramarSesionPage');
  }

  ionViewCanLeave(): boolean {
    return this.atras();
  }



  // Acciones sobre el calendario.

  onViewTitleChanged(title) {
    this.titulocalendario = title;
  }
  onEventSelected(event) {

    let myMoment: moment.Moment = moment(event.startTime, "America/Bogota").locale('es-CO')
    console.log(event.startTime, myMoment)
    this._ionicComponentPrvdr.showAlert({
      title: 'Programar sesión',
      message: 'Donde: ' + this.ubicacion.coordenadas.titulo + '<br>Cuando: ' + myMoment.format('LLLL'),
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navegacion = this.paginas.ubicacion.pagina;
            this.viewCtrl.dismiss({
              titulo: this.ubicacion.coordenadas.titulo,
              fecha: myMoment.format(),
              direccion: this.ubicacion.coordenadas.direccion,
              latitud: this.ubicacion.coordenadas.latitud,
              longitud: this.ubicacion.coordenadas.longitud,
              complemento: this.ubicacion.coordenadas.complemento,
              sesionId: this.sesion.sesionId
            });
          }
        }
      ]
    })


  }

  onTimeSelected(ev) {
    console.log("onTimeSelected")
    if (ev.events.length !== 0) {
      this.calendar.mode = "day";
      this.tituloaccion = this.paginas.hora.titulo;
      this.navegacion = this.paginas.hora.pagina;
    }

  }

  onCurrentDateChanged(ev: Date) {
    console.log("onCurrentDateChanged")
    if (this.currentDate.getMonth() != ev.getMonth()) {
      this.loadEvents(ev, this.sesion.sesionId)
    }
  };


  loadEvents(fecha, sesionId) {
    this._asociadosPrvdr.obtenerAgendaAsociado(fecha.getFullYear(), fecha.getMonth(), sesionId)
      .subscribe((data) => {
        this.eventSource = data
        this.currentDate = fecha
      })
  };

  markDisabled(date: Date) {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  mostrarCalendario() {
    this.navegacion = this.paginas.dia.pagina;
    this.tituloaccion = this.paginas.dia.titulo;
    this.calendar = {
      mode: 'month',
      // currentDate: this.currentDate,
      locale: 'es-CO',
      // eventSource: this._asociadosPrvdr.agendaasociado,
      noEventsLabel: "",
      autoSelect: false,
      formatHourColumn: "HH:mm"
    };
  }

  //Acciones de navegacion

  cerrarModal() {
    this.navegacion = this.paginas.ubicacion.pagina;
    this.viewCtrl.dismiss();
  }

  atras(): boolean {
    if (this.navegacion == this.paginas.dia.pagina) {
      this.tituloaccion = this.paginas.ubicacion.titulo;
      this.navegacion = this.paginas.ubicacion.pagina;
      return false;
    } else if (this.navegacion == this.paginas.hora.pagina) {
      this.tituloaccion = this.paginas.dia.titulo;
      this.calendar.mode = 'month';
      this.navegacion = this.paginas.dia.pagina;
      return false;
    } else if (this.navegacion == this.paginas.ubicacion.pagina) {
      return true;
    }
  }

  coordenadas(event) {
    this.botonmapa = false;
    if (event.coordenadas.error == false) {
      let ubicacionValida = this.ubicacionEnZona(event.coordenadas.longitud, event.coordenadas.latitud)
      if (ubicacionValida || (event.coordenadas.longitud == 0 && event.coordenadas.latitud == 0)) {
        this.ubicacion = event;
        this.botonmapa = true;
      }else{
        this._ionicComponentPrvdr.showLongToastMessage("Ubicación fuera del área de cobertura del prestador.")
      }

    }

  }

  complementoDireccion() {
    if (this.ubicacion.coordenadas.index == -1 || this.ubicacion.recalculada == true) {
      let message = ""
      if (this.ubicacion.recalculada == -1) {
        message = "Ingresa lo siguiente"
      } else {
        message = "Comfirma lo siguiente"
      }
      this._ionicComponentPrvdr.showAlert({
        title: 'Complemento de dirección',
        message: message,
        inputs: [
          {
            name: 'titulo',
            placeholder: 'Titulo',
            value: this.ubicacion.coordenadas.titulo
          },
          {
            name: 'direccion',
            placeholder: 'Drirección',
            value: this.ubicacion.coordenadas.direccion
          },
          {
            name: 'complemento',
            placeholder: 'Complemento',
            value: this.ubicacion.coordenadas.complemento
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Continuar',
            handler: data => {
              this.ubicacion.coordenadas.titulo = data.titulo
              this.ubicacion.coordenadas.direccion = data.direccion
              this.ubicacion.coordenadas.complemento = data.complemento
              if (
                this.ubicacion.coordenadas.titulo.length > 0
                &&
                this.ubicacion.coordenadas.direccion.length > 0
              ) {
                this.mostrarCalendario()
                this.ubicaciones.push(this.ubicacion.coordenadas)
              } else {
                this.complementoDireccion()
              }
            }
          }
        ],
        cssClass: 'alertCustomCss'
      })

    } else {
      this.mostrarCalendario()
    }
  }


  ubicacionEnZona(longitud, latitud) {
    let polygonGeometry = (new ol.format.GeoJSON())
      .readFeature(this.sesion.prestador.zona)
      .getGeometry();

    let punto = new ol.Feature({
      geometry: new ol.geom.Point([
        longitud,
        latitud
      ])
    })

    let coords = punto.getGeometry().getCoordinates()
    if (polygonGeometry.intersectsCoordinate(coords) == true) {
      return true
    } else {
      return false
    }
  }


}

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
        let polygonGeometry = (new ol.format.GeoJSON())
          .readFeature(this.sesion.prestador.zona)
          .getGeometry();

        for (let i in this._ubicacionesPrvdr.ubicaciones) {
          let punto = new ol.Feature({
            geometry: new ol.geom.Point([
              this._ubicacionesPrvdr.ubicaciones[i].longitud,
              this._ubicacionesPrvdr.ubicaciones[i].latitud
            ])
          })

          let coords = punto.getGeometry().getCoordinates()
          if (polygonGeometry.intersectsCoordinate(coords) == true) {
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

    let myMoment: moment.Moment = moment(event.startTime, "Europe/London")

    this._ionicComponentPrvdr.showAlert({
      title: 'Programar sesión',
      message: 'Donde: ' + this.ubicacion.titulo + '<br>Cuando: ' + myMoment.calendar(),
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
              titulo: this.ubicacion.titulo,
              fecha: myMoment.format(),
              direccion: this.ubicacion.direccion,
              latitud: this.ubicacion.latitud,
              longitud: this.ubicacion.longitud,
              complemento: this.ubicacion.complemento,
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
      this.loadEvents(ev, this.sesion.id)
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
      autoSelect: false
    };
  }

  // loadEvents() {
  //   this.calendar.eventSource = this._asociadosPrvdr.agendaasociado;
  // }

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
    console.log(event)
    this.ubicacion = event.coordenadas;
    this.botonmapa = true;
  }


}

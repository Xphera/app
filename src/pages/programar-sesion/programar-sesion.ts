import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AsociadosProvider } from '../../providers/asociados/asociados';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

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

  //variables de navegacion
  paginas = {
    ubicacion: { titulo: "1. Ubicación", pagina: 'ubicacion' },
    dia: { titulo: "2. Selecciona día", pagina: 'calendarioDia' },
    hora: { titulo: "3. Selecciona hora", pagina: 'calendarioHora' }
  };
  navegacion: string = this.paginas.ubicacion.pagina;
  tituloaccion: string = this.paginas.ubicacion.titulo;

  mapa: any = {}
  ubicacion: any = {}
  botonmapa:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public _asociadosPrvdr: AsociadosProvider,
    public _usuariosPrvdr: UsuariosProvider) {

    this._asociadosPrvdr.obtenerAgendaAsociado();
    this._usuariosPrvdr.obtenerUbicaciones();

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
    this.navegacion = this.paginas.ubicacion.pagina;
    this.viewCtrl.dismiss({ ubicacion: this.ubicacion, agenda: event });
  }

  onTimeSelected(ev) {
    if (ev.events.length !== 0) {
      this.calendar.mode = "day";
      this.tituloaccion = this.paginas.hora.titulo;
      this.navegacion = this.paginas.hora.pagina;
    }
  }

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
      currentDate: new Date(),
      locale: 'es-CO',
      eventSource: this._asociadosPrvdr.agendaasociado,
      noEventsLabel: "",
      autoSelect: false
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

  coordenadas(event): void {
    this.ubicacion = event.coordenadas;
    console.log(event);
    this.botonmapa = true;
  }


}

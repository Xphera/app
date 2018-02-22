import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
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

  @ViewChild(Navbar) navBar: Navbar;

  // sesion: any = {}
  // index: number = 0;

  //variables de calendario
  titulocalendario: string = '';
  calendar: any = {};

  //variables de mapa
  ubicacion: any;
  mapa: any = {};

  //variables de navegacion
  paginas = {
    ubicacion: { titulo: "1. Ubicación", pagina: 'ubicacion' },
    dia: { titulo: "2. Selecciona día", pagina: 'calendarioDia' },
    hora: { titulo: "3. Selecciona hora", pagina: 'calendarioHora' }
  };
  navegacion:string = this.paginas.ubicacion.pagina;
  tituloaccion: string = this.paginas.ubicacion.titulo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public _asociadosPrvdr: AsociadosProvider,
    public _usuariosPrvdr: UsuariosProvider,
    platform: Platform) {

    this._asociadosPrvdr.obtenerAgendaAsociado();
    this._usuariosPrvdr.obtenerUbicaciones();


    platform.registerBackButtonAction(() => {
      this.atras();
    }, 1);

    //  this.sesion = this.navParams.get("sesion");
    //  this.index = this.navParams.get("index");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramarSesionPage');
  }


  // Acciones sobre el calendario.
  onViewTitleChanged(title) {
    this.titulocalendario = title;
  }
  onEventSelected(event) {
    console.log(event);
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
    this.viewCtrl.dismiss();
  }

  atras() {
    if (this.navegacion == this.paginas.dia.pagina) {
      this.tituloaccion = this.paginas.ubicacion.titulo;
      this.navegacion = this.paginas.ubicacion.pagina;
    } else if (this.navegacion == this.paginas.hora.pagina) {
      this.tituloaccion = this.paginas.dia.titulo;
      this.calendar.mode = 'month';
      this.navegacion = this.paginas.dia.pagina;
    } else if (this.navegacion == this.paginas.ubicacion.pagina) {
      this.cerrarModal();
    }
  }


  //accion de select de ubicaciones
  onSelectChange(selectedValue: any) {
    this.ubicacion = this._usuariosPrvdr.ubicaciones[selectedValue];
    this.mapa = {
      zoom: 18,
      latitude: this.ubicacion.latitude,
      longitude: this.ubicacion.longitude,
      zoomControl: false,
      streetViewControl: false,
      title: this.ubicacion.title,
      mostrar: true
    }
  }

}

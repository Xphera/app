import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CONFIG } from '../../config/comunes.config';
import { App } from 'ionic-angular';
/**
 * Generated class for the ChartSesionesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-chart-sesiones',
  templateUrl: 'chart-sesiones.html'
})
export class ChartSesionesComponent {

  CONFIG = CONFIG;
  @Input() paquete: any;

  @Output() clickBotonSesiones = new EventEmitter();

  objetoPaquete: any

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';

  constructor(
    public app: App
  ) {
    console.log('Hello ChartSesionesComponent Component');
    // copia de objeto

  }

  ngOnChanges() {
    this.pieChartLabels = ['Por Programar', 'Programada', 'Finalizada']
    this.pieChartData = [this.paquete.sesionPorAgendar, this.paquete.sesionAgendadas, this.paquete.sesionFinalizadas]
    // copiar objeto paquete
    this.objetoPaquete = Object.assign({}, this.paquete)
  }

  ngDoCheck() {
    // check for object mutation
    if (this.objetoPaquete.sesionPorAgendar !== this.paquete.sesionPorAgendar ||
      this.objetoPaquete.sesionAgendadas !== this.paquete.sesionAgendadas ||
      this.objetoPaquete.sesionFinalizadas !== this.paquete.sesionFinalizadas) {

      this.pieChartData = [this.paquete.sesionPorAgendar, this.paquete.sesionAgendadas, this.paquete.sesionFinalizadas]
      // copiar objeto paquete
      this.objetoPaquete = Object.assign({}, this.paquete)
      console.log("ngDoCheck = copia")
    }
  }

  onClick() {
    this.clickBotonSesiones.emit({ 'paquete': this.paquete });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  iraCategoria() {
    this.app.getRootNavs()[0].setRoot('HomePage')
  }

}

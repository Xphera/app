import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CONFIG } from '../../config/comunes.config';

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
  // @Input() nombre: string;
  // @Input() valor: number;
  // @Input() sesiones: number = 0;
  // @Input() sesionPorAgendadar: number = 0;
  // @Input() sesionAgendadas: number = 0;
  // @Input() sesionFinalizadas: number = 0;
  // @Input() detalle: string;
  // @Input() prestador: any;
  @Output() clickBotonSesiones = new EventEmitter();


  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';

  constructor() {
    console.log('Hello ChartSesionesComponent Component');
  }

  ngOnChanges() {
    this.pieChartLabels = ['Por Agendar', 'Agendada', 'finalizada']
    this.pieChartData = [this.paquete.sesionPorAgendadar, this.paquete.sesionAgendadas, this.paquete.sesionFinalizadas]
  }

  onClick() {
    this.clickBotonSesiones.emit({'paquete':this.paquete});
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

}

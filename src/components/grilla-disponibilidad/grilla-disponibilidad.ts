import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dia } from './models/index.model';

/**
 * Generated class for the GrillaDisponibilidadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-grilla-disponibilidad',
  templateUrl: 'grilla-disponibilidad.html'
})
export class GrillaDisponibilidadComponent {

  public myData: boolean;
  public dias: Dia[];
  public horas: number[];
  public Defaultdisponibilidad: Array<Array<boolean>>;
  @Output() getDisponibilidad = new EventEmitter();
  @Input() disponibilidad: Array<any>;


  constructor() {
    this.Defaultdisponibilidad = new Array<Array<boolean>>();
    for (let dia = 1; dia <= 7; dia++) {
      this.Defaultdisponibilidad[dia] = new Array<boolean>();
      for (let hora = 0; hora <= 23; hora++) {
        this.Defaultdisponibilidad[dia].push(false)
      }
    }

    this.dias = Array<Dia>(
      new Dia(1, "Lun"),
      new Dia(2, "Mar"),
      new Dia(3, "Mie"),
      new Dia(4, "Jue"),
      new Dia(5, "Vie"),
      new Dia(6, "Sab"),
      new Dia(7, "Dom")
    );

    this.horas = new Array<number>(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23);

    console.log('Hello GrillaDisponibilidadComponent Component');

  }

  ngOnChanges() {

    for (let dia in this.disponibilidad) {
      for (let hora in this.disponibilidad[dia]) {
          this.Defaultdisponibilidad[dia][hora] = this.disponibilidad[dia][hora]
      }
    }
  }

  clickBoton() {
    this.getDisponibilidad.emit(this.Defaultdisponibilidad)
  }

}

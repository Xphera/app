import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Ionic2RatingModule } from "ionic2-rating";
import {Sesion} from '../../models/models.index';

/**
 * Generated class for the ProximaSesionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-proxima-sesion',
  templateUrl: 'proxima-sesion.html'
})
export class ProximaSesionComponent {

@Input() sesion: Sesion;
@Output() clickDetalleSesion = new EventEmitter();
  constructor() {
    console.log('Hello ProximaSesionComponent Component');

  }

  clickBotonDetalleSesion(sesion){
    this.clickDetalleSesion.emit(sesion)
  }

}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

import {Sesion} from '../../models/models.index';
/**
 * Generated class for the SesionesCompradasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-sesiones-compradas',
  templateUrl: 'sesiones-compradas.html'
})
export class SesionesCompradasComponent {

  @Output() clickDetalleSesion = new EventEmitter();
  @Output() clickCancelarSesion = new EventEmitter();
  @Output() clickReprogramarSesion = new EventEmitter();
  @Output() clickProgramarSesion = new EventEmitter();

  @Input() compradetallesesiones: Array<Sesion>
  activeItemSliding: ItemSliding = null;
  public sesionesProgramadas: number = 1

  constructor() {
    console.log('Hello SesionesCompradasComponent Component');
  }

  clickBotonDetalleSesion(sesion:Sesion) {
    this.clickDetalleSesion.emit({ 'sesion': sesion })
  }

  clickBotonCancelarSesion(sesion) {
    this.clickCancelarSesion.emit(sesion)
  }

  clickBotonReprogramarSesion(sesion: any) {
    this.clickReprogramarSesion.emit(sesion)
  }

  clickBotonprogramarSesion(sesion: any) {
    this.clickProgramarSesion.emit(sesion)
  }

  contadorSesionesProgramadas() {
    return this.sesionesProgramadas;
  }



  slidingItemOpen(itemSlide: ItemSliding, item) {

    if (this.activeItemSliding !== null) //use this if only one active sliding item allowed
      this.closeOption();

    this.activeItemSliding = itemSlide;

    let swipeAmount = 280; //set your required swipe amount
    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass('active-options-right', true);
    itemSlide.setElementClass('active-swipe-right', true);

    item.setElementStyle('transition', null);
    item.setElementStyle('transform', 'translate3d(-' + swipeAmount + 'px, 0px, 0px)');

  }
  closeOption() {
    console.log('closing item slide..');

    if (this.activeItemSliding) {
      this.activeItemSliding.close();
      this.activeItemSliding = null;
    }
  }



}

import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';

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

  @Input() compradetallesesiones: Array<any>
  activeItemSliding: ItemSliding = null;
  public sesionesProgramadas:number=1

  constructor() {
    console.log('Hello SesionesCompradasComponent Component');
  }
// TODO: no envia valor de sesion a pagina
  clickBotonDetalleSesion(sesion){
    this.clickDetalleSesion.emit({'sesion':sesion})
  }
  // TODO: no envia valor de sesion a pagina
  clickBotonCancelarSesion(sesion){
      console.log(sesion)
    this.clickCancelarSesion.emit('hola!!!!')
  }
  // TODO: no envia valor de sesion a pagina
  reprogramarSesion(sesion:any){
      console.log(sesion)
    this.clickReprogramarSesion.emit({'sesion':sesion})
  }
  // TODO: no envia valor de sesion a pagina
  clickBotonprogramarSesion(sesion:any) {
  console.log(sesion)
    this.clickProgramarSesion.emit(sesion)
  }

  // TODO: colocar contador de sesio programadas
  contadorSesionesProgramadas(){
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

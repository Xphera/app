import { Component, Input } from '@angular/core';
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

  @Input() compradetallesesiones: Array<any>
  activeItemSliding: ItemSliding = null;
  public sesionesProgramadas:number=1

  constructor() {
    console.log('Hello SesionesCompradasComponent Component');
  }
  contadorSesionesProgramadas(){
    return this.sesionesProgramadas;
  }
  programarSesion(item) {
    console.log(item)
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

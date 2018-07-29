import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CreditCardTypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'creditCardType',
})
export class CreditCardTypePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(tipo: any) {
    console.log(tipo,'tipo')
    return '<ion-item-sliding class="item-wrapper active-slide active-options-right"><ion-item style="transform: translate3d(-199px, 0px, 0px);">Hoy en casa 9 am <ion-badge item-end>Programada</ion-badge></ion-item><ion-item-options side="right"><button ion-button color="secondary"><ion-icon name="ios-refresh-circle"></ion-icon>Reprogramar</button><button ion-button color="primary"><ion-icon name="ios-information-circle"></ion-icon>Detalle</button></ion-item-options>'
  }
}

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
  transform(tipo: string) {
    return tipo.toLowerCase();
  }
}

import { TarjetaCreditoInterface } from '../interface/interface.index';
/**
* Representa tarjeta de credito.
* @class TarjetaCredito
*/
export class TarjetaCredito implements TarjetaCreditoInterface {
  public cardType: string;
  public cardholderName: string;
  public cardNumber: string;
  public expiryMonth: number;
  public expiryYear: number;
  public cvv: string;
  public redactedCardNumber:string;
  public postalCode:string;
}

import { TarjetaCreditoInterface } from '../interface/interface.index';
/**
* Representa tarjeta de credito.
* @class TarjetaCredito
*/
export class TarjetaCredito implements TarjetaCreditoInterface {
  public creditCardTokenId: string;
  public maskedNumber: string;
  public paymentMethod: string;
  public fullName:string;
  public cardNumber:string;
  public expirationDate:string;
  public principal:boolean;
}

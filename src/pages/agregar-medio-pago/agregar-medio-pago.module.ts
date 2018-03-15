import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarMedioPagoPage } from './agregar-medio-pago';
import { CardIO } from '@ionic-native/card-io';

import { NgXCreditCardsModule } from 'ngx-credit-cards';

@NgModule({
  declarations: [
    AgregarMedioPagoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarMedioPagoPage),
  ],
  providers: [CardIO,NgXCreditCardsModule]
})
export class AgregarMedioPagoPageModule {}

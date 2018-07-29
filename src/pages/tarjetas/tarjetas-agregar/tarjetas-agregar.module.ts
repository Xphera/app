import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarjetasAgregarPage } from './tarjetas-agregar';
import { CardIO } from '@ionic-native/card-io';
import { NgXCreditCardsModule } from 'ngx-credit-cards';


@NgModule({
  declarations: [
    TarjetasAgregarPage,
  ],
  imports: [
    IonicPageModule.forChild(TarjetasAgregarPage),
  ],
  providers: [CardIO,NgXCreditCardsModule]
})
export class TarjetasAgregarPageModule {}

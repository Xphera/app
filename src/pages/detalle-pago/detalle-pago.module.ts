import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePagoPage } from './detalle-pago';

@NgModule({
  declarations: [
    DetallePagoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePagoPage),
  ],
})
export class DetallePagoPageModule {}

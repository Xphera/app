import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSesionPage } from './detalle-sesion';

@NgModule({
  declarations: [
    DetalleSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSesionPage),
  ],
})
export class DetalleSesionPageModule {}

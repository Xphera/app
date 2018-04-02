import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisPaquetesPage } from './mis-paquetes';

@NgModule({
  declarations: [
    MisPaquetesPage,
  ],
  imports: [
    IonicPageModule.forChild(MisPaquetesPage),
  ],
})
export class MisPaquetesPageModule {}

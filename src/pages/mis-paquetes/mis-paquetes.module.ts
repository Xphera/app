import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisPaquetesPage } from './mis-paquetes';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MisPaquetesPage,
  ],
  imports: [
    IonicPageModule.forChild(MisPaquetesPage),
    PipesModule
  ],
})
export class MisPaquetesPageModule {}

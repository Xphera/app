import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisponibilidadPage } from './disponibilidad';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    DisponibilidadPage,
  ],
  imports: [
    IonicPageModule.forChild(DisponibilidadPage),
    ComponentsModule
  ],
})
export class DisponibilidadPageModule {}

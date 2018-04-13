import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePaqueteActivoPage } from './detalle-paquete-activo';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DetallePaqueteActivoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePaqueteActivoPage),
    ComponentsModule
  ],
})
export class DetallePaqueteActivoPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePaqueteActivoPage } from './detalle-paquete-activo';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DetallePaqueteActivoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePaqueteActivoPage),
    ComponentsModule,
    PipesModule
  ],
})
export class DetallePaqueteActivoPageModule {}

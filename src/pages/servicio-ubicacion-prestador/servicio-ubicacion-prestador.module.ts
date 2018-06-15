import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicioUbicacionPrestadorPage } from './servicio-ubicacion-prestador';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ServicioUbicacionPrestadorPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicioUbicacionPrestadorPage),
    ComponentsModule
  ],
})
export class ServicioUbicacionPrestadorPageModule {}

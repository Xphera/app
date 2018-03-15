import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UbicacionesPage } from './ubicaciones';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UbicacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(UbicacionesPage),
    ComponentsModule
  ],
})
export class UbicacionesPageModule {}

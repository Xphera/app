import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCalificacionPage } from './modal-calificacion';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ModalCalificacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCalificacionPage),
    ComponentsModule
  ],
})
export class ModalCalificacionPageModule {}

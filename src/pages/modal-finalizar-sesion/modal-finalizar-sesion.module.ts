import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFinalizarSesionPage } from './modal-finalizar-sesion';

@NgModule({
  declarations: [
    ModalFinalizarSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFinalizarSesionPage),
  ],
})
export class ModalFinalizarSesionPageModule {}

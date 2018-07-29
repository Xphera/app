import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CambioContraseñaPage } from './cambio-contraseña';

@NgModule({
  declarations: [
    CambioContraseñaPage,
  ],
  imports: [
    IonicPageModule.forChild(CambioContraseñaPage),
  ],
})
export class CambioContraseñaPageModule {}

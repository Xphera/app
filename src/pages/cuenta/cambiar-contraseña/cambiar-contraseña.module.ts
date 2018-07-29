import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CambiarContraseñaPage } from './cambiar-contraseña';

@NgModule({
  declarations: [
    CambiarContraseñaPage,
  ],
  imports: [
    IonicPageModule.forChild(CambiarContraseñaPage),
  ],
})
export class CambiarContraseñaPageModule {}

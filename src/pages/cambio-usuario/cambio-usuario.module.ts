import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CambioUsuarioPage } from './cambio-usuario';

@NgModule({
  declarations: [
    CambioUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CambioUsuarioPage),
  ],
})
export class CambioUsuarioPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CambiarUsuarioPage } from './cambiar-usuario';

@NgModule({
  declarations: [
    CambiarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CambiarUsuarioPage),
  ],
})
export class CambiarUsuarioPageModule {}

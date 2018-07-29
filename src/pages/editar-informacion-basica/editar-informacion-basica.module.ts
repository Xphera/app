import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarInformacionBasicaPage } from './editar-informacion-basica';

@NgModule({
  declarations: [
    EditarInformacionBasicaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarInformacionBasicaPage),
  ],
})
export class EditarInformacionBasicaPageModule {}

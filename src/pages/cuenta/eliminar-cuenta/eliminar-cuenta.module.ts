import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EliminarCuentaPage } from './eliminar-cuenta';

@NgModule({
  declarations: [
    EliminarCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(EliminarCuentaPage),
  ],
})
export class EliminarCuentaPageModule {}

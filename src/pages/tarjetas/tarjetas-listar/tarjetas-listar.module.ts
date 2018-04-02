import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarjetasListarPage } from './tarjetas-listar';

@NgModule({
  declarations: [
    TarjetasListarPage,
  ],
  imports: [
    IonicPageModule.forChild(TarjetasListarPage),
  ],
})
export class TarjetasListarPageModule {}

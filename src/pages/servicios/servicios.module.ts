import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiciosPage } from './servicios';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    ServiciosPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiciosPage),
    IonicImageLoader
  ],
})
export class ServiciosPageModule {}

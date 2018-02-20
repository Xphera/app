import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsociadosPage } from './asociados';

import { Ionic2RatingModule } from "ionic2-rating";
@NgModule({
  declarations: [
    AsociadosPage,
  ],
  imports: [
    IonicPageModule.forChild(AsociadosPage),
    Ionic2RatingModule
  ],
})
export class AsociadosPageModule {}

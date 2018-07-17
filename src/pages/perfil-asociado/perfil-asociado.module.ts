import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilAsociadoPage } from './perfil-asociado';
import { Ionic2RatingModule } from "ionic2-rating";
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PerfilAsociadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilAsociadoPage),
    Ionic2RatingModule,
    PipesModule
  ],
})
export class PerfilAsociadoPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiCuentaPage } from './mi-cuenta';
import { MomentModule } from 'ngx-moment';
import { PipesModule } from '../../pipes/pipes.module';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    MiCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(MiCuentaPage),
    MomentModule,
    PipesModule,
    Ionic2RatingModule
  ],
})
export class MiCuentaPageModule {}

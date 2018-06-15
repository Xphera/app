import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSesionPage } from './detalle-sesion';
import { MomentModule } from 'angular2-moment';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    DetalleSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSesionPage),
    MomentModule,
    PipesModule,
    ComponentsModule,
	  CountdownTimerModule.forRoot(),
    Ionic2RatingModule 
  ],

})
export class DetalleSesionPageModule {}

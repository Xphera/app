import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSesionPage } from './detalle-sesion';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { MomentModule } from 'ngx-moment';
@NgModule({
  declarations: [
    DetalleSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSesionPage),
    CountdownTimerModule.forRoot(),
    MomentModule
  ],
})
export class DetalleSesionPageModule {}

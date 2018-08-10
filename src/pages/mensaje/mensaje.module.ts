import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensajePage } from './mensaje';
import { MomentModule } from 'angular2-moment';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MensajePage,
  ],
  imports: [
    IonicPageModule.forChild(MensajePage),
    MomentModule,
    PipesModule
  ],
})
export class MensajePageModule {}

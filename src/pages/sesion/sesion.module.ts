import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SesionPage } from './sesion';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    SesionPage,
  ],
  imports: [
    IonicPageModule.forChild(SesionPage),
    MomentModule
  ],
})
export class SesionPageModule {}

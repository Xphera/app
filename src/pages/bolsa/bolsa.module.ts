import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BolsaPage } from './bolsa';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    BolsaPage,
  ],
  imports: [
    IonicPageModule.forChild(BolsaPage),
    MomentModule
  ],
})
export class BolsaPageModule {}

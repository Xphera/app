import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPage } from './perfil';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PerfilPage
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
    PipesModule
  ],
})
export class PerfilPageModule {}

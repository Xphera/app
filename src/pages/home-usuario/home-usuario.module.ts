import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeUsuarioPage } from './home-usuario';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomeUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeUsuarioPage),    
    ComponentsModule
  ],
})
export class HomeUsuarioPageModule {}

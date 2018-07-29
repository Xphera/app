import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentarPage } from './comentar';

@NgModule({
  declarations: [
    ComentarPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentarPage),
  ],
})
export class ComentarPageModule {}

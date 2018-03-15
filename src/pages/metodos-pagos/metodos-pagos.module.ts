import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetodosPagosPage } from './metodos-pagos';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MetodosPagosPage,
  ],
  imports: [
    IonicPageModule.forChild(MetodosPagosPage),
    ComponentsModule
  ],
})
export class MetodosPagosPageModule {}

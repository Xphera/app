import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramarSesionPage } from './programar-sesion';

import { NgCalendarModule  } from 'ionic2-calendar';

import { AgmCoreModule } from '@agm/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    ProgramarSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramarSesionPage),
    NgCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMm0ooQUphviDgCru8vaAFbgN8P1c67Io',
      libraries: ["places"]
    })
  ],
})
export class ProgramarSesionPageModule {}

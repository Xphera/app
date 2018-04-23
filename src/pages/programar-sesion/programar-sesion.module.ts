import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramarSesionPage } from './programar-sesion';

import { ComponentsModule } from '../../components/components.module';

import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { MomentModule } from 'angular2-moment';
import 'moment/locale/es';

@NgModule({
  declarations: [
    ProgramarSesionPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ProgramarSesionPage),
    NgCalendarModule,
    ComponentsModule
  ],
})
export class ProgramarSesionPageModule { }

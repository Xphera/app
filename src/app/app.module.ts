import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { NativeStorage } from '@ionic-native/native-storage';
import { OneSignal } from '@ionic-native/onesignal';

import { PeticionProvider } from '../providers/peticion/peticion';
import { SesionProvider } from '../providers/sesion/sesion';

import {HttpClientModule} from '@angular/common/http';
import { IonicComponentProvider } from '../providers/ionic-component/ionic-component';
import { DisponibilidadProvider } from '../providers/disponibilidad/disponibilidad';
import { ZonaProvider } from '../providers/zona/zona';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../providers/almacenamiento/almacenamiento';

import { PrestadorProvider } from '../providers/prestador/prestador';
import { LocalizarUbicacionProvider } from '../providers/localizar-ubicacion/localizar-ubicacion';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OneSignal,
    PeticionProvider,
    SesionProvider,
    IonicComponentProvider,
    DisponibilidadProvider,
    ZonaProvider,
    AutenticacionProvider,
    AlmacenamientoProvider,
    NativeStorage,
    PrestadorProvider,
    LocalizarUbicacionProvider,
    PushNotificationProvider
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { OneSignal } from '@ionic-native/onesignal';

import {HttpClientModule} from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';

import { ImgCacheModule } from 'ng-imgcache';
import { CacheModule } from 'ionic-cache';
import { AppState } from './app.global';



import { MyApp } from './app.component';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { ServiciosProvider } from '../providers/servicios/servicios';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { AsociadosProvider } from '../providers/asociados/asociados';
import { PaquetesProvider } from '../providers/paquetes/paquetes';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { AlmacenamientoProvider } from '../providers/almacenamiento/almacenamiento';
import { AgendaProvider } from '../providers/agenda/agenda';
import { InicioProvider } from '../providers/inicio/inicio';
import { MetodoPagoProvider } from '../providers/metodo-pago/metodo-pago';
import { UbicacionesProvider } from '../providers/ubicaciones/ubicaciones';
import { IonicComponentProvider } from '../providers/ionic-component/ionic-component';
import { ClienteProvider } from '../providers/cliente/cliente';
import { PeticionProvider } from '../providers/peticion/peticion';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalizarUbicacionProvider } from '../providers/localizar-ubicacion/localizar-ubicacion';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { MensajeProvider } from '../providers/mensaje/mensaje';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ImgCacheModule,
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    AppState,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OneSignal,
    CategoriasProvider,
    ServiciosProvider,
    UsuariosProvider,
    AsociadosProvider,
    PaquetesProvider,
    AutenticacionProvider,
    NativeStorage,
    AlmacenamientoProvider,
    AgendaProvider,
    InicioProvider,
    MetodoPagoProvider,
    UbicacionesProvider,
    IonicComponentProvider,
    ClienteProvider,
    PeticionProvider,
    Geolocation,
    LocalizarUbicacionProvider,
    PushNotificationProvider,
    MensajeProvider
  ]
})
export class AppModule {}

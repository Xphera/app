import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {HttpClientModule} from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';

import { ImgCacheModule } from 'ng-imgcache';


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


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ImgCacheModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
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
    IonicComponentProvider
  ]
})
export class AppModule {}

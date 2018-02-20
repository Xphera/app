import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {HttpClientModule} from '@angular/common/http'


import { MyApp } from './app.component';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { ServiciosProvider } from '../providers/servicios/servicios';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { AsociadosProvider } from '../providers/asociados/asociados';
import { PaquetesProvider } from '../providers/paquetes/paquetes';


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
    CategoriasProvider,
    ServiciosProvider,
    UsuariosProvider,
    AsociadosProvider,
    PaquetesProvider
  ]
})
export class AppModule {}

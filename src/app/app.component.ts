import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { CONFIG } from '../config/comunes.config';

import { InicioProvider } from '../providers/inicio/inicio';

import { ImgCacheService } from 'ng-imgcache';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'HomePage';
  pages: Array<{ title: string, leftIcon: string, page: string }>;

  pages_authenticated: Array<{ title: string, leftIcon: string, page: string }>;

  placeholder = 'assets/imgs/avatar/cosima-avatar.jpg';
  chosenPicture: any;
  CONFIG = CONFIG;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _autenticacionprvdr: AutenticacionProvider,
    _inicioPrvdr: InicioProvider,
    imgCache: ImgCacheService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      imgCache.init({
        // Pass any options here...
      });

    });

    _inicioPrvdr.cargar();


    // Page navigation component
    this.pages = [
      { title: "Home", leftIcon: 'home', page: 'HomePage' },
    ];

    this.pages_authenticated = [
      { title: "Home", leftIcon: 'home', page: 'HomePage' },
      { title: "Ubicaciones", leftIcon: 'pin', page: 'UbicacionesPage' },
      { title: "Perfil", leftIcon: 'contact', page: 'PerfilPage' },
    ];

  }



  openPage(page) {
    this.nav.setRoot(page);
  }

  cerrarSesion() {
    this._autenticacionprvdr.cerrarSesion();
    this.nav.setRoot(this.rootPage);
  }

}

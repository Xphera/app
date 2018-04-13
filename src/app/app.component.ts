import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { CONFIG } from '../config/comunes.config';

import { InicioProvider } from '../providers/inicio/inicio';

import { ImgCacheService } from 'ng-imgcache';
import { CacheService } from "ionic-cache";

import { AppState } from './app.global';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: string = '';
  pages: Array<{ title: string, leftIcon: string, page: string }>;

  pages_authenticated: Array<{ title: string, leftIcon: string, page: string }>;

  placeholder = 'assets/imgs/avatar/cosima-avatar.jpg';

  chosenPicture: any;
  CONFIG = CONFIG;


  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _autenticacionPrvdr: AutenticacionProvider,
    _inicioPrvdr: InicioProvider,
    cache: CacheService,
    imgCache: ImgCacheService,
    public global: AppState) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();


      this._autenticacionPrvdr.cargaMenu()
        .then((resp: string) => {
          splashScreen.hide();
          this.rootPage = resp;
        })

      _inicioPrvdr.cargar();
      this.global.set('theme', 'custom-theme');

      imgCache.init({
        // Pass any options here...
      });

      // Set TTL to 12h
      cache.setDefaultTTL(60 * 60 * 12);
      // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(false);

    });

    // Page navigation component
    this.pages = [
      { title: "Categorias", leftIcon: 'home', page: 'HomePage' },
    ];

    this.pages_authenticated = [
      { title: "Home", leftIcon: 'home', page: 'HomeUsuarioPage' },
      { title: "Categorias", leftIcon: 'md-albums', page: 'HomePage' },
      { title: "Ubicaciones", leftIcon: 'pin', page: 'UbicacionesPage' },
      { title: "Perfil", leftIcon: 'contact', page: 'PerfilPage' },
      { title: "Cuenta", leftIcon: 'settings', page: 'CuentaPage' },
      { title: "Tarjetas de Credito", leftIcon: 'card', page: 'TarjetasListarPage' },
    ];

  }


  openPage(page) {
    this.nav.setRoot(page);
  }

  cerrarSesion() {
    this._autenticacionPrvdr.cerrarSesion()
      .then((resp: string) => {
        this.nav.setRoot(resp)
      });
  }

}

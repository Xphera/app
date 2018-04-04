import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { CONFIG } from '../config/comunes.config';

import { InicioProvider } from '../providers/inicio/inicio';

import { ImgCacheService } from 'ng-imgcache';
import { CacheService } from "ionic-cache";



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
    private _autenticacionPrvdr: AutenticacionProvider,
    private menuCtrl: MenuController,
    _inicioPrvdr: InicioProvider,
    cache: CacheService,
    imgCache: ImgCacheService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.cargaMenu();

      imgCache.init({
        // Pass any options here...
      });

      // Set TTL to 12h
      cache.setDefaultTTL(60 * 60 * 12);
      // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(false);

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
      { title: "Cuenta", leftIcon: 'settings', page: 'CuentaPage' },
      { title: "Tarjetas de Credito", leftIcon: 'card', page: 'TarjetasListarPage' },
    ];

  }

  cargaMenu() {
  //  this._autenticacionPrvdr.activo().then((resp:{data:string})=>{
      if (this._autenticacionPrvdr.activo()) {
        this.menuCtrl.enable(false, 'sesionInactiva');
        this.menuCtrl.enable(true, 'sesionActiva');
      } else {
        this.menuCtrl.enable(true, 'sesionInactiva');
        this.menuCtrl.enable(false, 'sesionActiva');
      }
    //})

  }



  openPage(page) {
    this.nav.setRoot(page);
  }

  cerrarSesion() {
    this._autenticacionPrvdr.cerrarSesion();
    this.nav.setRoot(this.rootPage);
  }

}

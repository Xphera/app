import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = '';
  rootPage: any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    modalCtrl: ModalController,
    _autenticacionPrvdr: AutenticacionProvider,
    public _pushNotificationPrvdr: PushNotificationProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this._pushNotificationPrvdr.init_notifications();
      _autenticacionPrvdr.activo()
        .then((data) => {
          if (data["data"] == null) {
            this.rootPage = 'LoginPage';
          } else {
            this.rootPage = 'TabsPage';
          }
          splashScreen.hide();

        })
        this._pushNotificationPrvdr.esActivo = true
    });

    platform.resume.subscribe((result) => {
        this._pushNotificationPrvdr.esActivo = true
    });
    platform.pause.subscribe((result) => {
        this._pushNotificationPrvdr.esActivo = false
    });
  }
}

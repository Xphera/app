import { Injectable, NgZone } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform, App } from 'ionic-angular';
import { UsuariosProvider } from '../usuarios/usuarios';

/*
  Generated class for the PushnNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PushNotificationProvider {
  public data: any = { tipo: '', sesionId: '' }
  public esActivo: boolean

  constructor(
    private oneSignal: OneSignal,
    public platform: Platform,
    public app: App,
    public _usuariosPrvdr: UsuariosProvider,
    public zone: NgZone
  ) {
    console.log('Hello PushnNotificationProvider Provider');
  }


  init_notifications() {

    if (this.platform.is('cordova')) {

      this.oneSignal.startInit('d8540210-8524-4ffe-aaf1-844417fdaf2d', '807999059175');

      this.oneSignal.sendTag("app", "cliente");

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe((data: any) => {
        // do something when notification is received
        this.zone.run(() => {
          if (data.payload.additionalData.tipo == "detalleSesion" || data.payload.additionalData.tipo == "detalleSesionAutomatica") {
            let pageId = this.app.getRootNavs()[0].getActive()["id"]
            this._usuariosPrvdr.obetenerPaqueteActivos()
            // llamar proceso segun pagina activa
            if(pageId == 'HomeUsuarioPage'){
              this._usuariosPrvdr.obtenerSesionesPorCalificar()
              this._usuariosPrvdr.obtenerProximaSesion()
            }else if(pageId =='DetalleSesionPage'){
              this._usuariosPrvdr.obtenerSesion(data.payload.additionalData.sesionId)
            }

          }
        })

      });

      this.oneSignal.handleNotificationOpened().subscribe((data: any) => {
        console.log(data.notification.payload.additionalData.sesionId)
        // do something when a notification is opened
        if (data.notification.payload.additionalData.tipo == "detalleSesion" || data.notification.payload.additionalData.tipo == "detalleSesionAutomatica") {
          this._usuariosPrvdr.obtenerSesionObservable(data.notification.payload.additionalData.sesionId)
            .subscribe((data) => {
              this.app.getRootNavs()[0].push('DetalleSesionPage', { sesion: data })
            })
        }
      });

      this.oneSignal.endInit();

    } else {
      console.log('OneSignal no configurado');
    }


  }

  addtagsNotificacion(tgas) {
    this.oneSignal.sendTags(tgas);
  }

  deletetagsNotificacion(Key) {
    this.oneSignal.deleteTag(Key)
  }

}

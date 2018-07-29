import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SesionProvider } from '../../providers/sesion/sesion';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'SesionPage';
  tab2Root = 'DetalleSesionPage';
  tab3Root = 'MiCuentaPage';

  public sesionIniciada

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _sesionPrvdr:SesionProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  detalleSesion(sesion) {
    this.navCtrl.push('DetalleSesionPage',{sesion,tipoSesion:''})
  }

  tabSelected(tab) {
  console.log(tab.index);
}

}

import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import {AutenticacionProvider} from '../../providers/autenticacion/autenticacion';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _autenticacionPrvdr:AutenticacionProvider,
    public _categoriasPrvdr: CategoriasProvider) {
      this._categoriasPrvdr.obtenerCategorias()
  }

  ionViewDidEnter() {
    //limpiar datos de sesion
    if(this.navParams.get('cerrarSesion')==true){
      this._autenticacionPrvdr.cerrarSesion()
    }
  }

  irServicios(data) {
    console.log(data)
    this.navCtrl.push('ServiciosPage', { "categoria": data})
  }
}

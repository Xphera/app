import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { CategoriasProvider } from '../../providers/categorias/categorias';
/**
 * Generated class for the ServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {


  categoria:any;
  segmentCategoria: string;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                private _serviciosPrvdr:ServiciosProvider,
                public _categoriasPrvdr: CategoriasProvider
              ) {

    this.categoria = this.navParams.get('categoria');
    this.segmentCategoria = this.categoria.id
    this._serviciosPrvdr.obtenerServicioCategoria(this.categoria.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosPage');
  }

  iraAsociados(data){
    this.navCtrl.push('ServicioUbicacionPrestadorPage',{servicio:data});
  }

  onSegmentChanged(data){
  this._serviciosPrvdr.obtenerServicioCategoria(data.value);
}



}

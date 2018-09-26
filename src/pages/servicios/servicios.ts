import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { AsociadosProvider } from '../../providers/asociados/asociados';
import { IonicComponentProvider } from '../../providers/ionic-component/ionic-component';
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
                public _categoriasPrvdr: CategoriasProvider,
                public _ionicComponentPrvdr: IonicComponentProvider,
                public _asociadosPrvr: AsociadosProvider,
              ) {

    this.categoria = this.navParams.get('categoria');
    this.segmentCategoria = this.categoria.id
    this._serviciosPrvdr.obtenerServicioCategoria(this.categoria.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosPage');
  }

  iraAsociados(data){

    this._asociadosPrvr.obtenerZonaServicios({ servicio: data.id })
    .subscribe(()=>{
      if(this._asociadosPrvr.zonasServicio.length <= 0){
        this._ionicComponentPrvdr.showAlert({
          title: '',
          subTitle: 'próximamente los mejores profesionales',
          buttons: [{
                text: 'OK',
                handler: data => {
                // this.navCtrl.pop()
                }
              }]
        })
      }else{
          this.navCtrl.push('ServicioUbicacionPrestadorPage',{servicio:data});
      }
    })


  }

  onSegmentChanged(data){
  this._serviciosPrvdr.obtenerServicioCategoria(data.value);
}



}

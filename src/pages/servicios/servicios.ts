import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Slides } from 'ionic-angular';

import { ServiciosProvider } from '../../providers/servicios/servicios';

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

  @ViewChild('slider') slider: Slides;
  asociadosPage = 'AsociadosPage'
  slideIndex = 0;
  categoria:any;
  serviciospage: any = 'ServiciosPage'

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                private _serviciosPrvdr:ServiciosProvider
              ) {

    this.categoria = this.navParams.get('categoria');

    _serviciosPrvdr.obtenerServicioCategoria(this.categoria.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosPage');
  }
  
  iraAsociados(){
    this.navCtrl.push(this.asociadosPage,{servicio:this._serviciosPrvdr.servicios[this.slideIndex]});
  }

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }

}

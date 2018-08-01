import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides,NavParams } from 'ionic-angular';

import { CategoriasProvider } from '../../providers/categorias/categorias';
import {AutenticacionProvider} from '../../providers/autenticacion/autenticacion';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slider') slider: Slides;
  servicioPage = 'ServiciosPage'

  slideIndex = 0;

  serviciospage: any = 'ServiciosPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _autenticacionPrvdr:AutenticacionProvider,
    public _categoriasPrvdr: CategoriasProvider) {



  }

  ionViewDidEnter() {
    //limpiar datos de sesion
    if(this.navParams.get('cerrarSesion')==true){
      this._autenticacionPrvdr.cerrarSesion()
    }
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

  irServicios() {
    this.navCtrl.push(this.serviciospage, { categoria: this._categoriasPrvdr.categorias[this.slideIndex] })
  }


}

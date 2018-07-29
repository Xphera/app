import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { CategoriasProvider } from '../../providers/categorias/categorias';



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
    public _categoriasPrvdr: CategoriasProvider) {

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

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides,MenuController } from 'ionic-angular';

import { CategoriasProvider } from '../../providers/categorias/categorias';

import { AutenticacionProvider } from '../../providers/autenticacion/autenticacion';

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
    public _categoriasPrvdr: CategoriasProvider,
    public _autenticacionPrvdr: AutenticacionProvider,
    private menuCtrl: MenuController) {
    this.cargaMenu();
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

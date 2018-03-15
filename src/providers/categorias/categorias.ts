import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL_CATEGORIA } from '../../config/url.confing';

import { Categoria } from '../../models/models.index';

import { AlmacenamientoProvider } from '../almacenamiento/almacenamiento';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {
  categorias: Array<Categoria> = new Array<Categoria>();
  constructor(
    public http: HttpClient,
    public _almacenamientoPrvdr: AlmacenamientoProvider
  ) {
    console.log('Hello CategoriasProvider Provider');
  }

  obtenerCategorias() {
    this._almacenamientoPrvdr.obtener('categoria').then((datos: { satatus: string, data: string }) => {
      this.categorias = JSON.parse(datos.data);
      console.log(this.categorias);
    });
  }

  grabarCategorias() {
    console.log(BASE_URL_CATEGORIA);
    this.http.get<Categoria[]>(BASE_URL_CATEGORIA, )
      .subscribe(data => {
        this._almacenamientoPrvdr.guardar('categoria', JSON.stringify(data)).then(() => {
          this.categorias = data;
          console.log(this.categorias);
        })
      });
  }

}

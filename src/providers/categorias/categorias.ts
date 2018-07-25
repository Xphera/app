import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_CATEGORIA } from '../../config/url.confing';

import { Categoria } from '../../models/models.index';

import { PeticionProvider } from '../peticion/peticion';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {
  categorias: Array<Categoria> = new Array<Categoria>();
  key:string = 'categoria'

  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider) {
    console.log('Hello CategoriasProvider Provider');
  }

  obtenerCategorias() {
    this._peticionPrvdr.almacenamiento(this.key)
      .then((datos) => {
        this.categorias = JSON.parse(datos['data']);
      });
  }

  grabarCategorias() {
    let request = this.http.get<Categoria[]>(URL_CATEGORIA)
    this._peticionPrvdr.peticion(request,this.key,false)
      .subscribe((resp: Categoria[]) => {
        this.categorias = resp;
      })
  }

}

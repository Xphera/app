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
  chunkCategorias;
  itemPorfila = 3;
  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider) {
    console.log('Hello CategoriasProvider Provider');
  }

  obtenerCategorias() {
    let request = this.http.get<Categoria[]>(URL_CATEGORIA)
    return this._peticionPrvdr.peticion(request)
      .subscribe((resp: Categoria[]) => {
          this.categorias = resp;
          this.chunkCategorias = this.categorias.map(x => Object.assign({}, x));
          this.chunkCategorias = this.chunkArray(this.chunkCategorias,this.itemPorfila)
      })
  }

  chunkArray(myArray, chunk_size){
      let results = [];
      while (myArray.length) {
          results.push(myArray.splice(0, chunk_size));
      }
      return results;
  }

}

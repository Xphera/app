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
  chunkCategorias = new Array<any>();
  itemPorfila = 3;
  constructor(
    public http: HttpClient,
    private _peticionPrvdr: PeticionProvider) {
    console.log('Hello CategoriasProvider Provider');
  }

  obtenerCategorias() {
    let request = this.http.get<Categoria[]>(URL_CATEGORIA)
    this._peticionPrvdr.peticion(request)
      .subscribe((resp: Categoria[]) => {
          this.categorias = resp;
          this.chunkCategorias = resp.map(x => Object.assign({}, x));
          this.chunkCategorias = this.chunkArray(resp,this.itemPorfila)

      })
  }

  chunkArray(myArray, chunk_size){    
   let index = 0;
   let arrayLength = myArray.length;
   let tempArray = [];

   for (index = 0; index < arrayLength; index += chunk_size) {
       let myChunk = myArray.slice(index, index+chunk_size);
       // Do something if you want with the group
       tempArray.push(myChunk);
   }

   return tempArray;
  }

}

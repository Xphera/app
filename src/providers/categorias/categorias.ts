import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL_CATEGORIA } from '../../config/url.confing';

import { Categoria } from '../../models/models.index';

/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {
  categorias:Categoria[] = [];
  constructor(public http: HttpClient) {
    console.log('Hello CategoriasProvider Provider');
  }

  obtenerCategorias(){
     this.http.get<Categoria[]>(BASE_URL_CATEGORIA,)
          .subscribe( data =>{
            this.categorias = data;
          });
  }
  obtenerCategoriaIndex(index:number){
    return this.categorias[index];
  }

}

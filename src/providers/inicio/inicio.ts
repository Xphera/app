import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaquetesProvider } from '../paquetes/paquetes';
import { AsociadosProvider } from '../asociados/asociados';
import { CategoriasProvider } from '../categorias/categorias';
import { ServiciosProvider } from '../servicios/servicios';
/*
  Generated class for the InicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InicioProvider {

  constructor(
    public http: HttpClient,
    public _paquetesPrvdr: PaquetesProvider,
    public _asociadosPrvdr: AsociadosProvider,
    public _categoriasPrvdr: CategoriasProvider,
    public _serviciosPrvdr:ServiciosProvider
  ) {
    console.log('Hello InicioProvider Provider');
  }

  cargar() {
    this._asociadosPrvdr.grabarAsociados();
    this._paquetesPrvdr.grabarPaquetes();
    this._categoriasPrvdr.grabarCategorias();
    this._serviciosPrvdr.grabarServicios();
  }





}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISocialProvider } from '../../interface/interface.index';


/*
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocialGooGProvider implements ISocialProvider  {

    constructor(public http: HttpClient) {
      console.log('Hello SocialGooGProvider Provider');
    }

    getToken():string{

      let token:any = {};
      
      if(localStorage.getItem("googToken") == null) {

        /**TODO: get token google */
        token = {
          "token":"googTokenData"
        }
        localStorage.setItem("googToken",JSON.stringify(token));  
      }
      else{
        token = JSON.parse(localStorage.getItem("googToken"));
      }

      return token.token;

    }
}

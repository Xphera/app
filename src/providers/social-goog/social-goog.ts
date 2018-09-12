import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISocialProvider } from '../../interface/interface.index';
import { GooglePlus } from '@ionic-native/google-plus';
 

/*
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocialGooGProvider implements ISocialProvider  {


    constructor(public http: HttpClient,private googlePlus: GooglePlus) {
      console.log('Hello SocialGooGProvider Provider');

    }
    removeToken(){
      localStorage.removeItem("fbToken");
    }
    getToken():Promise<any>{
      return new Promise<any>((resolve,reject)=>{
        let token:any = {};
            
            if(localStorage.getItem("googToken") == null) {

              /**TODO: get token google */
              token = {
                "token":"",
                "userId":""
              }

              this.googlePlus.login({})
              .then(
                res => {
                  console.log("_______________________________________________\n"+"___________________TOKEN GOOGLE________________\n"
                  +JSON.stringify(res)+"\n_______________________________________________");
                  
                  token.token = res.accessToken;
                  token.userId = res.userId;
                  //localStorage.setItem("googToken",JSON.stringify(token));
                  resolve(token);
                })
            .catch(err => {
              console.error(err)
              console.error(JSON.stringify(err))
              reject(err)
            });



            }
            else{
              token = JSON.parse(localStorage.getItem("googToken"));
            }

            
      });
      

    }
}

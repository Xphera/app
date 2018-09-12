import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISocialProvider } from '../../interface/interface.index';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


/*
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocialFbProvider implements ISocialProvider  {

    constructor(public http: HttpClient,private fb: Facebook) {
      console.log('Hello SocialFbProvider Provider');
    }
    removeToken(){
      localStorage.removeItem("fbToken");
    }
    getToken():Promise<any>{
        return new Promise<any>((resolve,reject)=>{
          let token:any = {};
              if(localStorage.getItem("fbToken") == null) {

                  /*** 
                    * let tokenData = {
                        "status":"connected",
                        "authResponse":
                        {
                          "accessToken":"EAAEGUL0FNLcBAAsxiiZBmRUzZCjYEB5tobPGTRguBLnICJ6UCAdumIsxBBCw8RSALmjJi9sQArHN3rBlfZB6axGa3PZCQP18W1rrNFKVFtQ5Yl3K3YjFA4KcQZCXCIapCqBTNeNJ43OX79s95ZBT48bpZArlkQ7ax32ulI4ETDhTZAV2ZAFtcru3sPXNZAJv6BX64ZD",
                          "expiresIn":"5170116",
                          "session_key":true,
                          "sig":"...",
                          "userID":"10215705193718193"
                        }
                    };
                    **/

                    //https://developers.facebook.com/docs/facebook-login/permissions
                    let permisosFB = [
                      'public_profile',
                      'email',
                      'user_gender',
                      'user_birthday'
                    ];
              this.fb.login(permisosFB)
              .then((res: FacebookLoginResponse) => 
              {
                if(res.status == "connected"){
                  console.log('Logged into Facebook!', res);
                  localStorage.setItem("fbToken", JSON.stringify(res));
                  resolve(res.authResponse.accessToken);
                }else{
                  //https://developers.facebook.com/docs/facebook-login/web/
                  //[not_authorized|unknown]
                  reject(res.status);
                }
              })
              .catch(e => {
                console.log('Error logging into Facebook', e)
                reject(e);
              })
                  
                
              } else {
                token = JSON.parse(localStorage.getItem("fbToken"));
                resolve(token.authResponse.accessToken);
              }

        });
    }
}

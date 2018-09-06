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

    getToken():string{

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
      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => 
      {
        console.log('Logged into Facebook!', res);
        localStorage.setItem("fbToken", JSON.stringify(res));
        token = res;
      })
      .catch(e => console.log('Error logging into Facebook', e))
            token = {
              "status": "error"
            };
        
      } else {
        token = JSON.parse(localStorage.getItem("fbToken"));
      }

      if(token.status == "error"){
        return "error";
      }else{
        return token.authResponse.accessToken;
      }

    }
}

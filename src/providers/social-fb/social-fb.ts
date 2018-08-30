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
      this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => 
  {
    console.log('Logged into Facebook!', res);
    return res;
  })
  .catch(e => console.log('Error logging into Facebook', e))
        return "error";
    }

}

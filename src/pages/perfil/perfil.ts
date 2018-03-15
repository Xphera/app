import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  pet: string = "puppies";
  user = {
  name: 'Cosima Niehaus',
  profileImage: 'assets/img/avatar/girl-avatar.png',
  coverImage: 'assets/img/background/background-5.jpg',
  occupation: 'Designer',
  location: 'Seattle, WA',
  description: 'Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.',
  address: '27 King\'s College Cir, Toronto, ON M5S, Canada',
  phone: '555 555 555',
  email: 'cosima@niehaus.com',
  whatsapp: '555 555 555',
};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}

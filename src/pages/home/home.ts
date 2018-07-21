import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {MainPage} from '../main/main';
import { GooglePlus } from '@ionic-native/google-plus';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public googlePlus: GooglePlus,public restProvider: RestProvider) {

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    this.navCtrl.push(MainPage);
  }

  doGoogleLogin(){
    // let nav = this.navCtrl;
    // let env = this;

    this.googlePlus.login({
      'webClientId': '987333508972-p1u4lmmeltk397tcmbtjsmmfgqtkc3hs.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    })
    .then(function (user) {
        this.RestProvider.addUser('user', {
           first_name: user.givenName,
           last_name: user.familyName,
           username: "none",
           email: user.email,
           password: "none",
         })
      .then(function(){
        this.navCtrl.push(MainPage);
      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      console.log(error);
    });
  }




}

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
    let nav = this.navCtrl;
    let env = this;
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(function (user) {
     this.RestProvider.addUser.setItem('user', {
        first_name: user.GivenName,
        last_name: user.FamilyName,
        username: "none",
        email: user.email,
        password: "none",
      })
      .then(function(){
        nav.push(MainPage);
      }, function (error) {
        console.log(error);
      })
    }, function (error) {
      loading.dismiss();
    });
  }

  

}

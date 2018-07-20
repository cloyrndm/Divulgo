import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MainPage} from '../main/main';
import { RestProvider } from '../../providers/rest/rest';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = { first_name: '', last_name: '', email: '', username: '', password: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){

    

      this.restProvider.addUser(this.user).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });
  }

}

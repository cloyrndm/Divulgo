import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {MainPage} from '../main/main';
import {HomePage} from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,private alertCtrl: AlertController,public toaster: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.restProvider.addUser(this.user).then((result) => {
    this.navCtrl.push(HomePage);
    console.log(result);
  }, (err) => {
    console.log(err);
  });
    const toast = this.toaster.create({
    message: 'User Registered Successfully',
    duration: 3000
    });
    toast.present();
  }

}

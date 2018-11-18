import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {MainPage} from '../main/main';
import { GooglePlus } from '@ionic-native/google-plus';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  output
  logindetail = {username: '', password: ''}
  userlogin:any;
  useridd;
  constructor(public navCtrl: NavController, public googlePlus: GooglePlus,public restProvider: RestProvider,private alertCtrl: AlertController,public navParams: NavParams) {

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
   let id_ : any;
  this.restProvider.login(this.logindetail).then(data=>{
  this.userlogin=data;
  //sample to get specific data from object
  // console.log("before id");
  // console.log(this.userlogin.id); 
  console.log("in the home");
  console.log(this.userlogin);
    id_  = this.userlogin.id;
  //sample to pass data to another page
  // this.useridd = this.navParams.get('userid');
  if(this.userlogin==null){
    console.log("error in home");
  }
  else{
    this.navCtrl.push(MainPage,{id_});
  }
  })

  }
    
doGoogleLogin(){
 this.googlePlus.login({})
      .then(res => {
this.restProvider.addUser({
           first_name: res.givenName,
           last_name: res.familyName,
           username: "none",
           email: res.email,
           password: "none"
         })
      })
      .catch((error) => {
        let alert = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: 'Email already used',
        buttons: ['Okay']
      });
      alert.present();
      });
      this.navCtrl.push(MainPage);

}

    ///do not edit below this line
  }
    



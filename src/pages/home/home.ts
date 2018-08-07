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
         .then(res=>{
          this.navCtrl.push(MainPage);
        }, function (error) {
          console.log(error);
        })
      }, function (error) {
        console.log(error);
      });
  
    }
    ///do not edit below this line
  }
    



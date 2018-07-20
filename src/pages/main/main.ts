import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, App,ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {HomePage} from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface NativeGeocoderResultModel {
  subAdministrativeArea: string,
  postalCode: number,
  locality: string,
  subLocality: string,
  subThoroughfare: string,
  countryCode: string,
  countryName: string,
  administrativeArea: string,
  thoroughfare: string,
  street: string
}

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
imageURL
lat
long

complaintdetails = { user_id: '1', user_complaint: '', user_location: 'Cebu City'};
  constructor( public restProvider: RestProvider, public navCtrl: NavController, public navParams: NavParams, public app: App,public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public toaster: ToastController,private camera: Camera) {
    
  }

submit(){
    this.restProvider.addComplaint(this.
      complaintdetails).then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
});
}



  takePhoto(){
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
   
    this.camera.getPicture(options).then((imageData) => {
       this.imageURL = imageData
    }, (err) => {
       console.log(err);
    });
  }


geolocate(){
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

    this.geolocation.getCurrentPosition().then((resp) => {
    this.lat= resp.coords.latitude
    this.long=resp.coords.longitude
    console.log(this.lat);
    console.log(this.long);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

// return new Promise((resolve, reject) =>
// {
// this.nativeGeocoder.reverseGeocode(this.lat, this.long, options)
// .then((result: NativeGeocoderReverseResult[]) =>
// {
//   let newResult: NativeGeocoderResultModel = JSON.parse(JSON.stringify(result));
//   var str : string   = ` ${newResult.street} in ${newResult.countryCode}`;
//   console.log(str)
//   resolve(str);
// })

// })
}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  logout(){
    const root = this.app.getRootNav();
	  root.popToRoot();
  }


}

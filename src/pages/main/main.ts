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
lat: any;
long: any;
lattt: any;
longgg: any;
s: any;
c: any;
complaints:any;
complaint = { user_id: this.navParams.get('id_'), user_complaint: '', lattt:this.lat, longgg:this.long, imageURL: ImageData};
file = {imageURL:ImageData};
  constructor( public restProvider: RestProvider, public navCtrl: NavController, public navParams: NavParams, public app: App,public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public toaster: ToastController,private camera: Camera) {
    
  }
 //sample to pass data to another page, this is working
  // _id = this.navParams.get('id_');
  // console.log(_id);
submit(){
  // let _id: any;
    this.restProvider.addComplaint(this.complaint,this.file).then((result) => {
  console.log(result);
}, (err) => {
  console.log(err);
});
}



  takePhoto(){
    let options1: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
   
    this.camera.getPicture(options).then((imageData) => {
       this.imageURL = imageData
        this.geolocation.getCurrentPosition().then((resp) => {
    this.lat= resp.coords.latitude
    // this.lattt = this.lat;
    this.long=resp.coords.longitude
    // this.longgg = this.long;
    console.log(this.lat);
    console.log(this.long);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

return new Promise((resolve, reject) =>
{
this.nativeGeocoder.reverseGeocode(this.lat, this.long, options1)
console.log(this.lat);
console.log(this.long);
})
    }, (err) => {
       console.log(err);
    });
  }

  getComplaints(){
    this.restProvider.getComplaints()
    .then(data => {
      this.complaints = data;
      console.log(this.complaints);
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  logout(){
    const root = this.app.getRootNav();
	  root.popToRoot();
  }


}

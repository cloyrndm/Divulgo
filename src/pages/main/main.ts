import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, App,ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {HomePage} from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';

// import {MainPage} from '../main/main';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// export interface NativeGeocoderResultModel {
//   subAdministrativeArea: string,
//   postalCode: number,
//   locality: string,
//   subLocality: string,
//   subThoroughfare: string,
//   countryCode: string,
//   countryName: string,
//   administrativeArea: string,
//   thoroughfare: string,
//   street: string
// }

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
imageData: any;
public base64Image: string;
imageFileName:any;
imageURI: any;
lat: any;
long: any;
lattt: any;

//sample
strt: any;
strt2: any;
strt3: any;
strt4: any;
strt5: any;
strt6: any;
strt7: any;
strt8: any;

address: any;

// countrycode: any;
longgg: any;
s: any;
c: any;
ucomplaint:string;
agency:any;
status:any;
// complaintForm:any;
complaint:string;
   apiUrl2 = 'http://192.168.1.14:8080/apithree';
complaints:any;
replies:any;
// statement

// //trial----------------
// a_clicked = {"user_id":null,"user_complaint":this.ucomplaint,"lat":this.lat,"long":this.long,"address":this.address};
// e:any;
//----------------------


// complaint = {user_complaint: ''};

  constructor(public restProvider: RestProvider, public navCtrl: NavController, public navParams: NavParams, public app: App,public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public toaster: ToastController,private camera: Camera,private transfer: FileTransfer,public http: HttpClient,public platform: Platform) {
    this.complaint ="scomplaints";
  }


checkboxClick(){
status = "anonymous"
}


submit(){
if(status=="anonymous"){
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";

   var options: FileUploadOptions = {
      fileName: newFileName,
      fileKey: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { "user_id":0,"user_complaint":this.ucomplaint,"lat":this.lat,"long":this.long,"address":this.address}
      // params: { "user_id":this.navParams.get('id_'),"user_complaint":this.ucomplaint,"lat":"1.12341","long":"1.231244","agency":"SSS"}
    };

 const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.base64Image,this.apiUrl2+"/upload",options).then(data => {
        this.ucomplaint="";
        this.lat="";
        this.long="";
        this.address="";
        this.base64Image="";
        const toast = this.toaster.create({
        message: 'Complaint added successfully',
        duration: 3000
        });
        toast.present();
        console.log("success")
        }, err => {
        console.log("error")
        }); 
}
else{
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";

   var options: FileUploadOptions = {
      fileName: newFileName,
      fileKey: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { "user_id":this.navParams.get('id_'),"user_complaint":this.ucomplaint,"lat":this.lat,"long":this.long,"address":this.address}
      // params: { "user_id":this.navParams.get('id_'),"user_complaint":this.ucomplaint,"lat":"1.12341","long":"1.231244","agency":"SSS"}
    };

 const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.base64Image,this.apiUrl2+"/upload",options).then(data => {
        this.ucomplaint="";
        this.lat="";
        this.long="";
        this.address="";
        this.base64Image="";
        const toast = this.toaster.create({
        message: 'Complaint added successfully',
        duration: 3000
        });
        toast.present();
        console.log("success")
        }, err => {
        console.log("error")
        }); 
// }
}
}


  takePhoto(){

    const options : CameraOptions = {
      quality: 90,
      allowEdit:true,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
   
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude
      this.long=resp.coords.longitude
      // console.log(this.lat);
            let options1: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 3
    };

this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options1)
  .then((result: NativeGeocoderReverseResult[]) => {

  // this.strt = result[0].countryName; //phil
  // this.strt2 = result[0].postalCode; //nope
  // this.strt3 = result[0].administrativeArea; // Central visayas
  // this.strt4 = result[0].subAdministrativeArea; //cebu
  // this.strt5 = result[0].locality; //cebu city
  // this.strt6 = result[0].subLocality; //nope
  // this.strt7 = result[0].thoroughfare; // nevada street
  // this.strt8 = result[0].subThoroughfare; //nope

  this.address = result[0].thoroughfare+", "+result[0].locality;
  })
  .catch((error: any) => console.log(error));
      // console.log(this.long);
        }).catch((error) => {
         console.log('Error getting location', error);
       });
//dont touch


      //newwww


//dont touch
    });
  }

//   reverseGeocode(lat : number, lng : number) : Promise<any>
// {
//    return new Promise((resolve, reject) =>
//    {
//       this._GEOCODE.reverseGeocode(lat, lng)
//       .then((result : NativeGeocoderReverseResult) =>
//       {
//          let str : string   = `The reverseGeocode address is ${result.street} in ${result.countryCode}`;
//          resolve(str);
//       })
//       .catch((error: any) =>
//       {
//          reject(error);
//       });
//    });
// }


  getComplaints(){
    this.restProvider.getComplaints()
    .then(data => {
      this.complaints = data;
      console.log(this.complaints);
    });
  }

    getReplies(){
    this.restProvider.getReplies()
    .then(data => {
      this.replies = data;
      // console.log(this.complaints);
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

import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, App,ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {HomePage} from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';

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
longgg: any;
s: any;
c: any;
// complaint:any;
   apiUrl2 = 'http://172.20.10.11:8080/apithree';
complaints:any;
complaint = {user_complaint: ''};
// file = {imageData:this.imageURL};

// urlParameter = {
// 		'file': this.imageURL
// 	};
  constructor( public restProvider: RestProvider, public navCtrl: NavController, public navParams: NavParams, public app: App,public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public toaster: ToastController,private camera: Camera,private transfer: FileTransfer,public http: HttpClient,public platform: Platform) {
    
  }
 //sample to pass data to another page, this is working
  // _id = this.navParams.get('id_');
  // console.log(_id);
submit(){
   var options: FileUploadOptions = {
    //  filename:'file.jpg',
      fileKey: 'ionicfile',
      // fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { "user_id":this.navParams.get('id_'),"user_complaint":this.complaint,"lat":this.lat,"long":this.long }
    };
// // const formData = new FormData();
// formData.append('imggg', this.imageURL);

//  fileTransfer.upload(this.imageURL,this.apiUrl2+"/upload", options);
  // let _id: any;
  //   this.restProvider.addComplaint(this.complaint,this.file)
  //   apiUrl2 = 'http://192.168.1.6:8080/apithree';
        // const fileTransfer: FileTransferObject = this.transfer.create();
  //   // var reader = new FileReader();
  //   // var imgData =  reader.readAsBinaryString(this.imageURL);
  //   var options=
  //   {
  //   // headers: {
  //   //   'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
  //   // },

  //   mimeType: "multipart/form-data",
  //   fileKey: 'file',
  // // formData.append('imggg', this.imageURL);
  // // formData.append('user_id',this.navParams.get('id_'));
  // // formData.append('user_complaint',this.complaint);
  // // formData.append('lat',this.lat);
  // // formData.append('long',this.long);
  //   params: {"user_id":this.navParams.get('id_'),"user_complaint":this.complaint,"lat":this.lat,"long":this.long},
  //   // params: {"imggg":this.imageURL,"user_id":this.navParams.get('id_'),"user_complaint":this.complaint,"lat":this.lat,"long":this.long},
  //   chunkedMode: false
  //   // headers: headers
  //   // data: FormData
  //   };

    // var options = new FileUploadOptions();
    // var options;
    // options.fileKey = "file";

    // options.params = { 'imggg': imgData, 'complaint': this.complaint };
    // var ft = new FileTransfer();
    // var data = any;
    // var params = {};
	  // this.imageURL="imggg";
    //   const formData = new FormData();
    // formData.append('file', this.imageURL);

  // Okay, so the platform is ready and our plugins are available.
  // Here you can do any higher level native things you might need.
 const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.base64Image,this.apiUrl2+"/upload",options).then(data => {
        console.log("success")
        }, err => {
        console.log("error")
        });



    //     / let httpOptions = {
    // let httpOptions = {
    //   headers: new HttpHeaders({s
    //       'mimetype': 'multipart/form-data'
    //   })
    // };
  // var data = {
  //       "file": this.imageURL,
  //       "complaint": this.complaint
  //     };
  //     var header = { "headers": {"Content-Type": "multipart/form-data"} };
  // let body = new HttpParams();
  // body = body.set('imggg', this.imageURL);
  //   body = body.set('user_id', this.navParams.get('id_'));
  //     body = body.set('user_complaint',this.complaint);
  //       body = body.set('lat', this.lat);
  //         body = body.set('long', this.long);
  // const formData = new FormData();
  // // // const complaintData = new FormData();
  // formData.append('file', this.imageURL);
  // formData.append('user_id',this.navParams.get('id_'));
  // formData.append('user_complaint',this.complaint);
  // formData.append('lat',this.long);
  // formData.append('long',this.long);
  // // var header = { "headers": {"Content-Type": "application/json"} };
  // this.http.post(this.apiUrl2+'/upload',{params:{"file":this.imageURL,"user_id":this.navParams.get('id_'),"user_complaint":this.complaint,"lat":this.lat,"long":this.long}})
  //  this.http.post(this.apiUrl2+'/upload',body)
  // .subscribe(res => {
  //   resolve(res);
  // }, (err) => {
  //   reject(err);
  // });
}


  takePhoto(){
  //   let options1: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  // };

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
      this.lat= resp.coords.latitude
      this.long=resp.coords.longitude
      // console.log(this.lat);
      // console.log(this.long);
       }).catch((error) => {
         console.log('Error getting location', error);
       });

// return new Promise((resolve, reject) =>
// {
// this.nativeGeocoder.reverseGeocode(this.lat, this.long, options1)
// console.log(this.lat);
// console.log(this.long);
// })
//     }, (err) => {
      //  console.log(err);
      
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

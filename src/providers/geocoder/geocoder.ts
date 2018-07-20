// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
//   import { Geolocation } from '@ionic-native/geolocation';

// /*
//   Generated class for the GeocoderProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
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


// @Injectable()
// export class GeocoderProvider {
// lat
// long
//   constructor(public http: HttpClient,private _GEOCODE  : NativeGeocoder,private geolocation: Geolocation) {
//     console.log('Hello GeocoderProvider Provider');
//   }
//   reverseGeocode() : Promise<any>
//   {
//     let options: NativeGeocoderOptions = {
//       useLocale: true,
//       maxResults: 5
//   };


//     this.geolocation.getCurrentPosition().then((resp) => {
//     this.lat= resp.coords.latitude
//      this.long=resp.coords.longitude
//      }).catch((error) => {
//        console.log('Error getting location', error);
//      });



//      return new Promise((resolve, reject) =>
//      {
//         this._GEOCODE.reverseGeocode(this.lat, this.long)
//         .then((result : NativeGeocoderReverseResult[]) =>
//         {
//           let newResult: NativeGeocoderResultModel = JSON.parse(JSON.stringify(result));
//            let str : string   = `The reverseGeocode address is ${newResult.street} in ${newResult.countryCode}`;
//            resolve(str);
//         })
//         .catch((error: any) =>
//         {
//            reject(error);
//         });
//      });
//   }
// }

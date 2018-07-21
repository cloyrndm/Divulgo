import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://192.168.1.11:8080/apitwo';
  apiUrl2 = 'http://192.168.1.11:8080/apithree'
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  addUser(data) {

    return new Promise((resolve, reject) => {
      console.log('Got inside the addUser');
      this.http.post(this.apiUrl+'/users', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addComplaint(data) {

    return new Promise((resolve, reject) => {
      console.log('Got inside the addUser');
      this.http.post(this.apiUrl2+'/complaints', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}

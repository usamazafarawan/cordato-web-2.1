import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
// import Swal from 'sweetalert2'
import { AppProvider } from './app.provider'
// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';

import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class AppService {
  error(response_message: any): any {
    throw new Error("Method not implemented.");
  }

  httpOptions: any;

  baseUrl = "https://18.189.228.121:3032/api/v1/";// devlopmnet

  baseUrldemo = "https://18.189.228.121:3032/api/v1/";// devlopmnet

  websiteurl = 'http://3.6.100.194/usertestingweb/#/'

  evnvor = 'prod'
  constructor(
    public http: HttpClient,
    // private toastr: ToastrService,
    private _location: Location,
    private appProvider: AppProvider,
    private toastr: ToastrService
  ) {

    // if (this.evnvor == 'prod') {
    //   this.baseUrl = "http://3.20.114.64:3010/"; // live
    //   this.baseUrlCrop = 'http://3.20.114.64:3014/'
    //   this.websiteurl = 'http://3.20.114.64/onlineusertesting/#/'
    // }
    // 
    if (window.location.protocol == 'http:') {
      this.baseUrl = "http://18.189.228.121:3032/api/v1/"; // live
      // this.baseUrl = 'http://localhost:3032/api/v1/'
    }
    else
      this.baseUrl = "https://cordato.com:3035/api/v1/"; // live
    this.websiteurl = 'https://cordato.com'
  }

  getApi(url: any): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  getApiWithAuth(url: any): Observable<any> {
    let token = this.appProvider.current.loginData && this.appProvider.current.loginData.jwtToken ? this.appProvider.current.loginData.jwtToken : ''
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': token ? token : ''
      }),
    }
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  formdataApi(url: string, data: any): Observable<any> {
    let token = this.appProvider.current.loginData && this.appProvider.current.loginData.jwtToken ? this.appProvider.current.loginData.jwtToken : ''
    var httpOptions;
    httpOptions = {
      headers: new HttpHeaders({ 'Authorization': token ? token : '' }),

    }
    return this.http.post((this.baseUrl + url), data, httpOptions)
  }



  succ(msg: any) {
    this.toastr.success(msg);
  }

  sweetAlert(msg: any) {
    // Swal.fire(msg);
  }
  err(msg: any) {
    this.toastr.error(msg);
  }
  showSpinner() {
    //  this.loader=true
  }
  hideSpinner() {
    // this.spinner.hide()
  }
  backClicked() {
    this._location.back();
  }


  postApi(url: any, data: any, isHeader: any): Observable<any> {
    if (!isHeader) {
      this.httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      }
      return this.http.post(this.baseUrl + url, data);
    }
    else {
      let token = this.appProvider.current.loginData && this.appProvider.current.loginData.jwtToken ? this.appProvider.current.loginData.jwtToken : ''
      this.httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json", 'Authorization': token ? token : '' }),
      }
      return this.http.post(this.baseUrl + url, data, this.httpOptions);
    }
  }

  uploadFile(file: any) {
  
  }


  postApiWithAuth(url: any, data: any, isHeader: any): Observable<any> {
    if (!isHeader) {
      this.httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      }
    } else {
      let token = this.appProvider.current.loginData && this.appProvider.current.loginData.jwtToken ? this.appProvider.current.loginData.jwtToken : ''
      this.httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'Authorization': token ? token : ''
        })
      }
    }
    return this.http.post(this.baseUrl + url, data, this.httpOptions);
  }

  exportFileData(url: any) {
    window.open(this.baseUrl + 'web/exportFile?fileName=' + url)
  }


  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
          console.log("err", err)
        });
    });
  }



}
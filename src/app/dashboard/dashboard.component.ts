import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  userData:any=''
  groupData:any=[]
  platform:any='android'
 
  id:any

  constructor(private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ){ }

  ngOnInit(): void {
    this.userData=this.appProvider.current.loginData
    this.onGetUserData()
    this.onCreatePaitentId()
    this.onGetAppointment() 
  }

  onselectPlatform(plat:any){
    this.platform=plat
    this.onGetAppointment()
  }

  onGetUserData(): void {
    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) {
        // console.log("Get User Data",success)
       
        this.userData=success.data
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData=success.data
       
        // this.parameterList = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onCreatePaitentId(): void { 
    this.service.getApiWithAuth("user/createPaitentId").subscribe(success => {
      if (success.status == 200) {
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onGetAppointment(): void{
    let data = {
      userId: this.userData._id ,
      platform: this.platform,
      timeZone: 'America/Chicago'
    } 
    console.log("Data",data)
 
    this.service.postApiWithAuth("user/getDashboardGroupDetailsWithRealm", data, 1).subscribe({
      next: (success) => {
        console.log("Data success",success)
        if (success.status == 200) {
          this.groupData = success.data 
          console.log("groupData",this.groupData)
        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }
 
  // onGetAppointment(): void{
  //   let data = {
  //     userId: this.userData._id ,
  //     platform: this.platform,
  //     timeZone: 'America/Chicago'
  //   } 
  //   console.log("Data",data)
 
  //   this.service.postApiWithAuth("user/getDashboardGroupDetails", data, 1).subscribe({
  //     next: (success) => {
  //       console.log("Data success",success)
  //       if (success.status == 200) {
  //         this.groupData = success.data 
  //         console.log("groupData",this.groupData)
  //       }
  //       else {
  //         this.service.err(success.message)
  //       }
  //     },
  //     error: (error) => {
  //       console.log({ error })
  //     }
  //   })
  // }


  
  // onGetAppointment(): void{
  //    this.service.getApiWithAuth("user/getDashboardGroupDetails?platform="+this.platform).subscribe(success => {
  //     console.log("Group Data success",success)
  //     if (success.status == 200) {
  //       this.groupData=success.data
  //       console.log(success) 
  //     }
  //     else {
  //       this.service.err(success.message)
  //     }
  //   }, error => {
  //     console.log({ error })
  //   })
  // }

  getColorCode(para:any){
    console.log(para)
    if(para.parameters.range){
      if(para.parameters.range && para.syncDataLast ){
        if(para.syncDataLast.value<para.parameters.minRange || para.syncDataLast.value>para.parameters.maxRange){
          return "Pink"
        }else{
          return "Aqua"
        }
      }else{
        return "Orange"
      }
    }else{
      return "Aqua"
    }
    // if(para && para.parameters){

    //   if()
    //   // return "Aqua"
    // }else{
    //   return "Aqua"
    // }

  }

}

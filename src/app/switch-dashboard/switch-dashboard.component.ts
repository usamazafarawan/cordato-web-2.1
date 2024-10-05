import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-switch-dashboard',
  templateUrl: './switch-dashboard.component.html',
  styleUrls: ['./switch-dashboard.component.css']
})
export class SwitchDashboardComponent implements OnInit {

  

  userData:any=''
  groupData:any=[]
  platform:any='android'
  userId=''
  orderObj:any={}
  constructor(private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute, 
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    // this.userData=this.appProvider.current.loginData
    this.activeRoute.queryParamMap
    .subscribe((params:any) => {
      console.log(params)
      console.log({ groupId: params['groupId'] })

      this.orderObj = { ...params };
      console.log(this.orderObj.params.groupId)
      if (this.orderObj.params.userId) {
        this.userId=this.orderObj.params.userId
        // this.parameterId=this.orderObj.params.parameterId
        this.onGetAppointment(this.orderObj.params.userId)
        this.onGetuserData(this.orderObj.params.userId)
      }

    })

  }

  onselectPlatform(plat:any){
    this.platform=plat
    this.onGetAppointment()
  }

  onGetAppointment(id?:any) {

    let url="user/getGroupDashboard?platform="+this.platform
    if(id){
      url=url+'&userId='+id
    }else{
      url=url+'&userId='+this.userId
    }
    this.service.getApiWithAuth(url).subscribe(success => {
      if (success.status == 200) {
        this.groupData=success.data
        console.log(success)
      
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onGetuserData(id?:any) {

    let url="user/getUserDetails?"
    if(id){
      url=url+'userId='+id
    }else{
      url=url+'userId='+this.userId
    }
    this.service.getApiWithAuth(url).subscribe(success => {
      if (success.status == 200) {
        this.userData=success.data
        console.log(success)
      
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
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

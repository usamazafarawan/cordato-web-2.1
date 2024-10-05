import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  appointmetmentData:any={}
  appointmetmentDataBackup:any={}
  selectedApp:any=''
  otpForm: FormGroup
  orderObj:any={}
  ratingData:any=[]
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.otpForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      searchText: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.activeRoute.queryParamMap
    .subscribe((params:any) => {
      console.log(params)
      console.log({ appId: params['appId'] })
      this.orderObj = { ...params };
      console.log(this.orderObj.params.appId)
      if (this.orderObj.params.appId) {
        this.onGetAppointment(this.orderObj.params.appId)
      }

    }
    );
  }
  onGetAppointment(id:any){

    let data={
      appId:id
    }
    this.service.postApiWithAuth("user/getAppointmentDetails",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.appointmetmentData = success.data
        this.appointmetmentDataBackup=success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onGetRating(){

    let data={
      doctorId:this.appointmetmentData.doctorId
    }
    this.service.postApiWithAuth("user/doctorRatingDetails",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.ratingData = success.data
        // this.appointmetmentDataBackup=success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  getTime(time:any){

    if(time){

      // console.log(time.split('T'))
      return time.split('T')[0]
    }
    
  }

  getTimeFromNow(time:any){

    if(time){
      return moment(time).fromNow()
    }else{
      return ''
    }
    
  }

  getDateFormat(time:any){

    if(time){
      return moment(time).format('YYYY-MM-DD')
    }else{
      return ''
    }
    
  }

  getFileName(url:any){
    if(url){
      let name=url.split('/').pop()
      return name
    }else{
      return ''
    }
  

  }

  onOpen(url:any) {
    window.open(url)
  }
}

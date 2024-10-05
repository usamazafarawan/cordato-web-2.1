import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
@Component({
  selector: 'app-checkin-doctor',
  templateUrl: './checkin-doctor.component.html',
  styleUrls: ['./checkin-doctor.component.css']
})
export class CheckinDoctorComponent implements OnInit {

  constructor(  private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
  }
  onNo(){

    let object=this.appProvider.current.currentChecking?this.appProvider.current.currentChecking:{}
    let data={
      talkToPhysician:"no",
      checkinId:object._id
    }
    this.service.postApiWithAuth("user/userUpdateCheckin",data,1).subscribe(success => {
      if (success.status == 200) {
        this.appProvider.current.checkinAppointment=null
        this.appProvider.current.currentChecking=null
        localStorage.setItem('healthchecking', '');
        localStorage.setItem('healthppcheck', '');
        this.route.navigate(['/chekin-new'])
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
   
    // let object = this.appProvider.current.checkinAppointment ? this.appProvider.current.checkinAppointment : {}
  }

  onYes(){
    

    let object=this.appProvider.current.currentChecking?this.appProvider.current.currentChecking:{}
    let data={
      talkToPhysician:"yes",
      checkinId:object._id
    }
    this.service.postApiWithAuth("user/userUpdateCheckin",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        let loginData=this.appProvider.current.loginData
        if(loginData && loginData.subscriptiondata && loginData.subscriptiondata.virtualDoc){
          this.route.navigate(['/chekin-book-doctor'])
        }else{
          this.service.err("Please upgrade your plan for booking")
        }
       
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
}

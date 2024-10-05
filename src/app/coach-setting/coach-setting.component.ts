import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-coach-setting',
  templateUrl: './coach-setting.component.html',
  styleUrls: ['./coach-setting.component.css']
})
export class CoachSettingComponent implements OnInit {

  ratingForm: FormGroup
  groupData:any=[]
  platform:any = 'android'
  groupId: any = ''
  userId = ''
  orderObj:any={}
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
   

    this.ratingForm = this.fb.group({
      rating: ['3.5', [Validators.required]],
      review: ['', [Validators.required]]
    })
    this.activeRoute.queryParamMap
    .subscribe((params: any) => {
      console.log(params)
      console.log({ groupId: params['groupId'] })

      this.orderObj = { ...params };
      console.log(this.orderObj.params.groupId)
      if (this.orderObj.params.userId && this.orderObj.params.groupId ) {
        this.groupId = this.orderObj.params.groupId
        this.userId = this.orderObj.params.userId
        // this.onGetGroupDetails(this.groupId,this.userId )
      }

    }
    );
  }


  ngOnInit(): void {
    this.onGetAppointment()
  }

  onselectPlatform(plat:any){
    this.platform=plat
    this.onGetAppointment()
  }
  onGetAppointment() {
    this.service.getApiWithAuth("user/getGroup?platform="+this.platform).subscribe(success => {
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
  onClick(data:any){
  

    let object={
      platform:this.platform,
      groupId:data._id,
      status:data.selectedGroup.isSelected?'Inactive':'Active'
    }
    this.service.postApiWithAuth("user/updateGroup", object,1).subscribe(success => {
      if (success.status == 200) {
      //  this.onGetAppointment()
      }
      else {
        this.service.err(success.message)
      }
      this.onGetAppointment()
    }, error => {
      console.log({ error })
    })

  }
}

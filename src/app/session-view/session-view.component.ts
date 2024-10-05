import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  appointmetmentData:any={}
  appointmetmentDataBackup:any={}
  selectedApp:any=''
  otpForm: FormGroup
  orderObj:any={}
  ratingData:any=[]
  groupId:any=''
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
      console.log({ groupId: params['groupId'] })

      this.orderObj = { ...params };
      console.log(this.orderObj.params.groupId)
      if (this.orderObj.params.groupId) {
        this.groupId=this.orderObj.params.groupId
        this.onGetGroupDetails(this.orderObj.params.groupId)
      }

    }
    );
  }
  onGetGroupDetails(id:any){

    let data={
      groupId:id
    }
    this.service.postApiWithAuth("user/getGroupDetails",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.appointmetmentData = success.data
        this.appointmetmentDataBackup=success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


}

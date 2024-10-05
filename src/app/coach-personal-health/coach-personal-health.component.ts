import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'

import * as moment from 'moment';
@Component({
  selector: 'app-coach-personal-health',
  templateUrl: './coach-personal-health.component.html',
  styleUrls: ['./coach-personal-health.component.css']
})
export class CoachPersonalHealthComponent implements OnInit {
  orderObj: any = {}
  groupId: any = ''
  userId = ''
  userDetails: any=''
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activeRoute.queryParamMap
    .subscribe((params: any) => {
      console.log(params)
      console.log({ groupId: params['groupId'] })

      this.orderObj = { ...params };
      console.log(this.orderObj.params.groupId)
      if (this.orderObj.params.userId && this.orderObj.params.groupId ) {
        this.groupId = this.orderObj.params.groupId
        this.userId = this.orderObj.params.userId
        this.onGetGroupDetails(this.groupId,this.userId )
      }

    }
    );
  }

  ngOnInit(): void {
  }

  onGetGroupDetails(groupId: any, userId:any) {

    let data = {
      toUserId: userId,
      groupId:groupId
    }
    
    this.service.postApiWithAuth("user/friendDetailsWithParams", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.userDetails = success.data && success.data.length>0? success.data[0]:''
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

}

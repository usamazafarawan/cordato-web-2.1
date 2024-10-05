import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-checkin-botthering',
  templateUrl: './checkin-botthering.component.html',
  styleUrls: ['./checkin-botthering.component.css']
})
export class CheckinBottheringComponent implements OnInit {
  appointmetmentList:any={}
  formGroup: FormGroup
  formInvalid=false
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.formGroup = this.fb.group({
      whatBotheringYou: ['', [Validators.required]],
      wantToTalkAboutBothering: ['yes', [Validators.required]],

    })
  }
  ngOnInit(): void {
  }

  onSave(){
    // this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }

    let object=this.appProvider.current.currentChecking?this.appProvider.current.currentChecking:{}
    let data={
      whatBotheringYou:this.formGroup.value.whatBotheringYou,
      wantToTalkAboutBothering:this.formGroup.value.wantToTalkAboutBothering,
      checkinId:object._id
    }
    this.service.postApiWithAuth("user/userUpdateCheckin",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.route.navigate(['/chekin-avatar'])
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

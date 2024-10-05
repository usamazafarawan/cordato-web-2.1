import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import { flatMap } from 'lodash';
declare var $: any;

@Component({
  selector: 'app-manage-subscription-genrate',
  templateUrl: './manage-subscription-genrate.component.html',
  styleUrls: ['./manage-subscription-genrate.component.css']
})
export class ManageSubscriptionGenrateComponent implements OnInit {

  SubscriptionBox: Boolean = false;
  subscriptionList:any = []
  loginData:any
  subData:any
  planData:any
  subCoupon:any
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
      rewardsSubId: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.loginData=this.appProvider.current.loginData
    console.log(this.loginData)
   
     this.onGetPlan()
     this.onGetCoupon()
  }
  
  onGetPlan(){


    this.service.getApiWithAuth("user/rewardsSubPlanList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.planData = success.data

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onGetCoupon(){


    this.service.getApiWithAuth("user/subCouponList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.subCoupon = success.data

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
  onSubmit() {

    if (this.formGroup.invalid) {
      this.formInvalid = true
      // this.service.sweetAlert('fghjk')
      return
    } else {
      this.formInvalid = false
      console.log(this.formGroup.value)
      
     

      let apiData = {
        "rewardsSubId": this.formGroup.value.rewardsSubId,
      }

      this.service.postApiWithAuth('user/createSubScriptionCoupon', apiData, 1).subscribe((success) => {
        console.log(success)
        if (success.status == 200) {
          this.onGetCoupon()
          $('#PlanModal').modal('hide')
          this.service.succ(success.message)
          this.formGroup.reset()
        }
        else {
          this.service.err(success.message)

        }
      }, error => {
        this.service.err("Something went wrong")

      })
      this.service.showSpinner()
    }
    
  }
  getValue(){
    console.log(this.planData)
    let data=this.planData.filter((it:any)=>it._id==this.formGroup.value.rewardsSubId)
    console.log(data)
    if(data && data.length){
      return data[0].points
    }else{
      return ''
    }
    

  }

}

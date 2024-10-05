import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import { flatMap } from 'lodash';
declare var $: any;
@Component({
  selector: 'app-health-gift',
  templateUrl: './health-gift.component.html',
  styleUrls: ['./health-gift.component.css']
})
export class HealthGiftComponent implements OnInit {

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
    this.onGetPlan()
    this.onGet()
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

  onGet() {


    this.service.getApiWithAuth("user/getSubscription").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.subscriptionList = success.data.filter((it:any)=>it.name!='Free')
        // this.route.navigate(['/dashboard'])
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
          // this.onGetCoupon()
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
  onPayPoint(sub:any){
    console.log(sub)
    if(sub.interval_count==6){
       let indexValue=this.planData.map((it:any)=>{return it.plan}).indexOf('6')
       console.log(indexValue)
       if(indexValue>-1){
         this.formGroup.patchValue({
          rewardsSubId:this.planData[indexValue]._id
         })
         $('#PlanModal').modal('show')
       }
    }

    if(sub.interval_count==1){
      let indexValue=this.planData.map((it:any)=>{return it.plan}).indexOf('12')
      console.log(indexValue)
      if(indexValue>-1){
        this.formGroup.patchValue({
         rewardsSubId:this.planData[indexValue]._id
        })

        $('#PlanModal').modal('show')
      }
    }
  }
  onPayment(sub:any){
    console.log(sub)

    if(sub.interval_count==6){
      let indexValue=this.planData.map((it:any)=>{return it.plan}).indexOf('6')
      console.log(indexValue)
      if(indexValue>-1){
        this.formGroup.patchValue({
         rewardsSubId:this.planData[indexValue]._id
        })
        // $('#PlanModal').modal('show')
      }
   }

   if(sub.interval_count==1){
     let indexValue=this.planData.map((it:any)=>{return it.plan}).indexOf('12')
     console.log(indexValue)
     if(indexValue>-1){
       this.formGroup.patchValue({
        rewardsSubId:this.planData[indexValue]._id
       })

      //  $('#PlanModal').modal('show')
     }
   }
    if(sub.yearlyCost==0 || !sub.yearlyCost){
      //  this.onZeroPayment(sub.id)

    }else{
      this.route.navigate(['/payment-gatway'],{ queryParams:{subId:sub.id,formGift:'Yes',rewardsSubId:this.formGroup.value.rewardsSubId}})
    }

  }

}

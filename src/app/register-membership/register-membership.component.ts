import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
@Component({
  selector: 'app-register-membership',
  templateUrl: './register-membership.component.html',
  styleUrls: ['./register-membership.component.css']
})
export class RegisterMembershipComponent implements OnInit {

  SubscriptionBox: Boolean = false;
  subscriptionList:any = []
  activeIndex=0
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
      code: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.onGet()
  }

  onindexActive(flag:any){

    if(flag=='Pre'){
     this.activeIndex=this.activeIndex==0?this.subscriptionList.length-1:this.activeIndex-1
    }else{
      this.activeIndex=this.activeIndex==this.subscriptionList.length-1?0:this.activeIndex+1
    }

  }

  onPayment(sub:any){
    console.log(sub)

    if(sub.yearlyCost==0 || !sub.yearlyCost){
       this.onZeroPayment(sub.id)

    }else{
      this.route.navigate(['/register-payment'],{ queryParams:{subId:sub.id}})
    }

  }

  onZeroPayment(id:any){

   let data={
    subscriptionId:id,
    completeStep:7

   }

    this.service.postApiWithAuth("user/payAmountZeroSub",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.subscriptionList = success.data
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/dashboard'])

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
        this.subscriptionList = success.data
        console.log("this.subscriptionList",this.subscriptionList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
  onDataApply(){

   
  
    


      if (this.formGroup.invalid) {
        this.formInvalid = true
        // this.service.sweetAlert('fghjk')
        return
      } else {
        this.formInvalid = false
        console.log(this.formGroup.value)
        
       
  
        let data={
          code:this.formGroup.value.code.trim(),
          completeStep:7
      
         }
        this.service.postApiWithAuth("user/subscribeFromCoupon",data,1).subscribe(success => {
          if (success.status == 200) {
      
                localStorage.setItem('healthlogin', JSON.stringify(success.data));
                this.appProvider.current.loginData = success.data
                this.route.navigate(['/dashboard'])

          }
          else {
            this.service.err(success.message)
          }
        }, error => {
          console.log({ error })
        })
      }

  }
}

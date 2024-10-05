import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'

@Component({
  selector: 'app-payment-gatway',
  templateUrl: './payment-gatway.component.html',
  styleUrls: ['./payment-gatway.component.css']
})
export class PaymentGatwayComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  projectFrom: FormGroup
  formInvalid = false
  type = 'password'
  loginUserData :any= null
  formGroup: FormGroup
  orderObj:any
  subData:any
  cardData:any
  subscriptionId:any
  loginData:any
  formGift:any='No'
  rewardsSubId:any
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private stripeService: StripeService) {
    this.projectFrom = this.fb.group({
      creditcount: ['22', [Validators.required]],
      name: ['222', [Validators.required]]

    })
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      cvc: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {

    let loginData = this.appProvider.current.loginData
    this.loginUserData=loginData
    console.log(loginData)

    this.onGetCardDetails()
   
    this.activeRoute.queryParamMap
    .subscribe((params:any) => {
      console.log(params)
      console.log({ subId: params['subId'] })
      this.orderObj = { ...params };
      console.log(this.orderObj.params.subId)
      if (this.orderObj.params.subId) {
        this.subscriptionId=this.orderObj.params.subId
        
        this.onGetSubDetails(this.orderObj.params.subId)
      }
      if(this.orderObj.params.formGift){
        this.formGift=this.orderObj.params.formGift
      }

      if(this.orderObj.params.rewardsSubId){
        this.rewardsSubId=this.orderObj.params.rewardsSubId
      }

    }
    );

  }

  onGetSubDetails(subId:any){

    let obj={
      subId:subId
    }
    this.service.postApiWithAuth("user/getSubscriptionDetails", obj,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.subData = success.data

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onGetCardDetails(){

   
    this.service.getApiWithAuth("user/getUserCardDetails").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.cardData = success.data
        if(this.cardData ){
          this.formGroup.patchValue({
            creditCard:this.cardData.cardNumber,
            expirationDate:this.cardData.expDate,
            email: this.loginUserData.email,
            name: this.cardData.cardHolderName ,
            phoneNumber: this.loginUserData.countryCode + ' ' + this.loginUserData.mobileNumber
          })
        }else{
          this.formGroup.patchValue({
            email: this.loginUserData.email,
            name: this.loginUserData.firstName + ' ' + this.loginUserData.lastName,
            phoneNumber: this.loginUserData.countryCode + ' ' + this.loginUserData.mobileNumber
          })
        }

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
  createToken(): void {
    const name = this.formGroup.value.name;

    if (this.formGroup.invalid) {
      this.formInvalid = true
      // this.service.sweetAlert('fghjk')

      return

    } else {
      console.log('hy')
      // this.stripeService
      //   .createToken(this.card.element, { name, address_city: 'noida' })
      //   .subscribe((result) => {
      //     if (result.token) {
      //       // Use the tokenon
      //       console.log(result.token)
      //       console.log(result.token.id);
      //       this.onSubmit(result.token)
      //     } else if (result.error) {
      //       // Error creating the token
      //       console.log(result.error.message);
      //     }
      //   });
      this.onSubmit('')
    }
  }
  onSubmit(token: any) {

    if (this.formGroup.invalid) {
      this.formInvalid = true
      // this.service.sweetAlert('fghjk')
      return
    } else {
      this.formInvalid = false
      console.log(this.formGroup.value)
      // this.loginUserData = JSON.parse(localStorage.getItem('userTesting'))
      console.log(this.loginUserData)

      // creditCard: ['', [Validators.required]],
      // expirationDate: ['', [Validators.required]],
      // cvc: ['', [Validators.required]],


      let apiData :any= {
         completeStep:7,
        "subscriptionId":this.subscriptionId,
        "email": this.formGroup.value.email,
        "userId": this.loginUserData.id,
        "name": this.formGroup.value.name,
        "phone": this.formGroup.value.phoneNumber,
        "payAmount":this.subData.amount ,
        "creditCard":this.formGroup.value.creditCard,
        "expirationDate":this.formGroup.value.expirationDate,
        "cvc":this.formGroup.value.cvc

      }

      if(this.formGift=='Yes'){
        apiData.rewardsSubId=this.rewardsSubId
        this.service.postApiWithAuth('user/payAndCreateSubScriptionCoupon', apiData, 1).subscribe((success) => {
          console.log(success)
          if (success.status == 200) {
            this.route.navigate(['/manage-account-genrate'])
            // this.onGetUserData()
            // this.service.succ('Payment successfull')
  
           
  
  
  
            //  this.service.sweetAlert('User Registration Successfull')
  
          }
          else {
            this.service.err(success.message)
            // this.service.sweetAlert(success.message)
            // this.service.err(success.message)
  
          }
        }, error => {
          this.service.err("Something went wrong")
          // this.service.sweetAlert("Something went wrong")
          //this.service.err("Something went wrong")
  
        })
      }else{
        this.service.postApiWithAuth('user/saveCardAndSubScripe', apiData, 1).subscribe((success) => {
          console.log(success)
          if (success.status == 200) {
            this.onGetUserData()
            // this.service.succ('Payment successfull')
  
           
  
  
  
            //  this.service.sweetAlert('User Registration Successfull')
  
          }
          else {
            this.service.err(success.message)
            // this.service.sweetAlert(success.message)
            // this.service.err(success.message)
  
          }
        }, error => {
          this.service.err("Something went wrong")
          // this.service.sweetAlert("Something went wrong")
          //this.service.err("Something went wrong")
  
        })
      }

      
      this.service.showSpinner()
    }
    
  }
  // onSubmit(token: any) {

  //   if (this.projectFrom.invalid) {
  //     this.formInvalid = true
  //     // this.service.sweetAlert('fghjk')
  //     return
  //   } else {
  //     this.formInvalid = false
  //     console.log(this.projectFrom.value)
  //     // this.loginUserData = JSON.parse(localStorage.getItem('userTesting'))
  //     console.log(this.loginUserData)
  //     let apiData = {
  //       "subscriptionId":this.subscriptionId,
  //       "email": this.formGroup.value.email,
  //       "stripeTokenId": token.id,
  //       "stripeToken": token,
  //       "userId": this.loginUserData.id,
  //       "name": this.formGroup.value.name,
  //       "phone": this.formGroup.value.phoneNumber,
  //       "payAmount": (this.subData.yearlyCost * 100)
  //     }

  //     this.service.postApiWithAuth('user/payAmount', apiData, 1).subscribe((success) => {
  //       console.log(success)
  //       if (success.status == 200) {
  //         // this.service.succ('Payment successfull')
  //         this.onGetUserData()
          



  //         //  this.service.sweetAlert('User Registration Successfull')

  //       }
  //       else {
  //         this.service.err(success.message)
  //         // this.service.sweetAlert(success.message)
  //         // this.service.err(success.message)

  //       }
  //     }, error => {
  //       this.service.err("Something went wrong")
  //       // this.service.sweetAlert("Something went wrong")
  //       //this.service.err("Something went wrong")

  //     })
  //     this.service.showSpinner()
  //   }
  // }
 onGetUserData(): void {


    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
       
        // this.userData=success.data
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData=success.data
        this.route.navigate(['/manage-subscription'])
       
        // this.parameterList = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

}

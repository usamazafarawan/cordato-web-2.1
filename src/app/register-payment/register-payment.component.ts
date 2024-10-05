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
  selector: 'app-register-payment',
  templateUrl: './register-payment.component.html',
  styleUrls: ['./register-payment.component.css']
})
export class RegisterPaymentComponent implements OnInit {
  // @ViewChild(StripeCardComponent) card: StripeCardComponent;

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
  loginUserData: any = null
  formGroup: FormGroup
  orderObj: any
  subData: any
  subscriptionId: any
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
    this.loginUserData = loginData
    this.formGroup.patchValue({
      email: loginData.email,
      name: loginData.firstName + ' ' + loginData.lastName,
      phoneNumber: loginData.countryCode + ' ' + loginData.mobileNumber
    })
    this.activeRoute.queryParamMap
      .subscribe((params: any) => {
        // console.log(params)
        // console.log({ subId: params['subId'] })
        this.orderObj = { ...params };
        console.log("aaaaaaaa", this.orderObj.params.subId)
        if (this.orderObj.params.subId) {
          this.subscriptionId = this.orderObj.params.subId
          this.onGetSubDetails(this.orderObj.params.subId)
        }
      }
      );
  }

  onGetSubDetails(subId: any) {
    let obj = {
      subId: subId
    }
    this.service.postApiWithAuth("user/getSubscriptionDetails", obj, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.subData = success.data
        this.subData.yearlyCost = Number(success.data.amount) / 100

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
      // console.log(this.card)
      this.onSubmit('')
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
    }
  }

  onSubmit(token: any) {

    console.log("token",token)

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

      let apiData = {
        completeStep: 7,
        "subscriptionId": this.subscriptionId,
        "email": this.formGroup.value.email,
        // "stripeTokenId": token.id,
        // "stripeToken": token,
        "userId": this.loginUserData.id,
        "name": this.formGroup.value.name,
        "phone": this.formGroup.value.phoneNumber,
        "payAmount": this.subData.amount,
        "creditCard": this.formGroup.value.creditCard,
        "expirationDate": this.formGroup.value.expirationDate,
        "cvc": this.formGroup.value.cvc
      }
  
      this.service.postApiWithAuth('user/saveCardAndSubScripe', apiData, 1).subscribe((success) => {
        console.log(success)
        if (success.status == 200) {
          this.onNextValue()
          this.service.succ('Payment successfully')
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
      this.service.showSpinner()
    }

  }
  onNextValue() {
    let data = {
      completeStep: 7
    }
    this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData = success.data
        this.route.navigate(['/dashboard-graph'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }


}

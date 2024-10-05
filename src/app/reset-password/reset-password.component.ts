import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;

declare function EyeIcon(): any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  otpSubmitCheck: boolean = false
  formGroup: FormGroup
  submitted = false
  formInvalid = false
  parametersData = []
  subParametersData = []
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass=false
  token:any=''
  orderObj:any={}
  tokenData:any={}
  tokenStatus:Boolean=false
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      newPassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      conPassword: ['', [Validators.required]]

    })

  }
   
 

  ngOnInit(): void {
    this.activeRoute.queryParamMap
      .subscribe((params:any) => {
        console.log(params)
        console.log({ token: params['token'] })
        this.orderObj = { ...params };
        // console.log(this.orderObj.params.userId)
        if (this.orderObj.params.token) {
          // this.userId = this.orderObj.params.userId
          this.onVerifyToken(this.orderObj.params.token)
        }
      }
      );
    EyeIcon()

  }
  onVerifyToken(token:any){
 
      let data = {
        token: token
      }
      this.service.postApi("user/onVerifyToken", data, 0).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ(success.message)
          this.tokenData=success.data
          this.tokenStatus=true
          // this.route.navigate(['/register-profile'])
        }
        else {
          this.tokenStatus=false
          this.route.navigate(['/token-expire'])
        }
      }, error => {
        this.route.navigate(['/token-expire'])
        console.log({ error })
      })
    
  }
  
  onSave(){
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)

    if(!this.tokenStatus){
      this.service.err('Your token is expired')
    }
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    if(this.formGroup.value.newPassword!=this.formGroup.value.conPassword){
      this.confirmPass=true
    }
    else {
      let data = {
        userId: this.tokenData.userId,
        password: this.formGroup.value.newPassword,
        deviceType: "website",
        deviceToken: "website"
      }
      this.service.postApi("user/forgotPassword", data, 0).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ(success.message)
          this.route.navigate(['/reset-success'])
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
  }
  
  onChangePass(){
    this.confirmPass=false
  }

}

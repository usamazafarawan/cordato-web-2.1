import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;

declare function EyeIcon(): any;

@Component({
  selector: 'app-register-setpassword',
  templateUrl: './register-setpassword.component.html',
  styleUrls: ['./register-setpassword.component.css']
})
export class RegisterSetpasswordComponent implements OnInit {

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

  public OTPScreen = false

  OTPForm: FormGroup;

  tostarMsg: Boolean = false
  wrongOTP: Boolean = false

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      newPassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      conPassword: ['', [Validators.required]]
    })
    this.OTPForm = this.fb.group({
      otp: ['',],  
    })
  }
   
  ngOnInit(): void {
    EyeIcon()
  }



  onOTPSend(){
    this.submitted = true
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    if(this.formGroup.value.newPassword!=this.formGroup.value.conPassword){
      this.confirmPass=true
    }
    else {
      let data = {
        email: this.formGroup.value.email, 
        deviceType: "website",
        deviceToken: "website"
      } 
      this.service.postApi("user/sendOtpOnEmail", data, 0).subscribe(success => {
        if (success.status == 200) {
          this.service.succ(success.message)
          // sessionStorage.setItem("email",this.formGroup.value.email); 
          this.OTPScreen=true
          // this.OTPForm.controls['otp'].setValue(success.data.otp)
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
  }

  onOTPVerify(){
    this.submitted = true
    if (this.OTPForm.invalid) {
      this.formInvalid = true
      return
    } 
    else {
      let data = {
        email: this.formGroup.value.email, 
        otp : this.OTPForm.value.otp,
        deviceType: "website",
        deviceToken: "website"
      } 
      this.service.postApi("user/verifyOtp", data, 0).subscribe(success => {
        if (success.status == 200) {
          this.onfinalSave()
          this.service.succ(success.message)
        }
        if(success.status == 400){
          this.wrongOTP = true
          setTimeout(() => {
            this.wrongOTP = false;
          }, 2000);
        }
        else {
          // this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
  }

  onfinalSave(){  
    let data = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.newPassword,
      deviceType: "website",
      deviceToken: "website"
    } 
    console.log("Final Data",data)
    this.service.postApi("user/userSignup", data, 0).subscribe(success => {
      if (success.status == 200) { 
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData = success.data
        this.route.navigate(['/register-profile'])
      } 

      if(success.status == 409){
        this.tostarMsg = true
        setTimeout(() => {
          this.tostarMsg = false;
        }, 2000);
      }

      else {
        // this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  
  }







  onSave(){
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    if(this.formGroup.value.newPassword!=this.formGroup.value.conPassword){
      this.confirmPass=true
    }
    else {
      let data = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.newPassword,
        deviceType: "website",
        deviceToken: "website"
      }
      return
      this.service.postApi("user/userSignup", data, 0).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ('data saved successfully')
          localStorage.setItem('healthlogin', JSON.stringify(success.data));
          this.appProvider.current.loginData = success.data
          this.route.navigate(['/register-profile'])
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

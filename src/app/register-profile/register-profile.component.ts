import { Component, OnInit   } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider' 
import * as moment from 'moment';
 
// import locale from 'date-fns/locale/en-US';

declare var $: any;
@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.css']
})
export class RegisterProfileComponent implements OnInit {
  otpSubmitCheck: boolean = false
  formGroup: FormGroup
  submitted = false
  formInvalid = false
  parametersData = []
  subParametersData = []
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass = false
  loginData: any 

    myDateValue: Date;
 
  
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder, 


  ) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]], 

    })
 

  }

 

 
  ngOnInit(): void {

    $('#sandbox-container input').datepicker({ });
    
    this.loginData = this.appProvider.current.loginData
    console.log(this.loginData)

    this.formGroup.patchValue({
      firstName: this.loginData.firstName,
      lastName: this.loginData.lastName,
      gender: this.loginData.gender,
      dob: moment(this.loginData.dob).format('YYYY-MM-DD'),
      phoneNumber: this.loginData.countryCode + '-' + this.loginData.mobileNumber,
      address: this.loginData.address,
    });

    this.myDateValue = new Date();
 

  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }
   

  onSave() {
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    if (this.formGroup.value.newPassword != this.formGroup.value.conPassword) {
      this.confirmPass = true
    }
    else {
      let data = {
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        gender: this.formGroup.value.gender,
        dob: moment(this.formGroup.value.dob).format('YYYY-MM-DD'),
        completeStep: 2
      }
      this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ('data saved successfully')
          localStorage.setItem('healthlogin', JSON.stringify(success.data));
          this.appProvider.current.loginData = success.data
          this.route.navigate(['/register-personal'])
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

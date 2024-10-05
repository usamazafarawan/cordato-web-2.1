import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;

declare function EyeIcon(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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


  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      newPassword: ['', [Validators.required]]

    })
  }

  ngOnInit(): void {
    EyeIcon()
  }


  onSave() {
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    else {
      let data = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.newPassword,
        deviceType: "website",
        deviceToken: "website"
      }
      this.service.postApi("user/userLogin", data, 0).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          if (success.data && success.data.completeStep == 1) {
            // this.service.succ('Your Profile is incomplete please complete first')
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/register-profile'])

          }
          else if (success.data && success.data.completeStep == 2) {
            // this.service.succ('Your Profile is incomplete please complete first')
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/register-personal'])
          }
          else if (success.data && success.data.completeStep == 3) {
            // this.service.succ('Your Profile is incomplete please complete first')
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/register-medication'])
          }
          else if (success.data && success.data.completeStep == 4) {
            // this.service.succ('Your Profile is incomplete please complete first')
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/register-clickon'])
          }

          else if (success.data && success.data.completeStep == 5) {
            // this.service.succ('Your Profile is incomplete please complete first')
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/rregister-family-member'])
          }
          else if (success.data && success.data.completeStep == 6) {
            // this.service.succ('Your Profile is incomplete please complete first')
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/register-membership'])
          }
          else {
            // this.service.succ(success.message)
            localStorage.setItem('healthlogin', JSON.stringify(success.data));
            this.appProvider.current.loginData = success.data
            this.route.navigate(['/dashboard-graph'])
          }

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

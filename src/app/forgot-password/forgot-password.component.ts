import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup
  formInvalid:any=false
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
     

    })
  }

  ngOnInit(): void {
   
  }

  onSendMail(){

    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }

    else {
      let data = {
        email: this.formGroup.value.email,
      }
      this.service.postApi("user/forgotPasswordReq", data, 0).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          this.service.succ(success.message)
          this.route.navigate(['/login'])
         
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

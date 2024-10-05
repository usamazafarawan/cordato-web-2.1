import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
declare function Header(): any;  

@Component({
  selector: 'app-coach-header',
  templateUrl: './coach-header.component.html',
  styleUrls: ['./coach-header.component.css']
})
export class CoachHeaderComponent implements OnInit {

  loginData:any=''
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginData=this.appProvider.current.loginData
    // console.log(this.loginData)
    Header()
  }

  onLogout(){

   
      this.service.getApiWithAuth("user/logout").subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ(success.message)
          this.route.navigate(['/'])
         
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    
  }


}

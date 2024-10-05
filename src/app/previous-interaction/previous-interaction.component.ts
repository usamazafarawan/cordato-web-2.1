import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;

declare function EyeIcon(): any;
import * as moment from 'moment';
@Component({
  selector: 'app-previous-interaction',
  templateUrl: './previous-interaction.component.html',
  styleUrls: ['./previous-interaction.component.css']
})
export class PreviousInteractionComponent implements OnInit {

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
  appointment:any=[]

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      fromDate: ['', ],
      toDate: ['',]

    })

  }
 
  ngOnInit(): void {
    this.onSave()
    EyeIcon()
   
  }


  onSave(){
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)

    let data=this.formGroup.value
 
      this.service.postApiWithAuth("user/lastInrection", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          this.appointment=success.data
          
       
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }

    onReset(){
      this.formGroup.reset()
      this.onSave()
    }

    getTime(time: any) {

      return moment(time).format('YYYY-MM-DD')
    }
  
    getAmPm(time: any){
      return moment(time).format('LT');
    }
    getFileName(url:any){
      if(url){
        let name=url.split('/').pop()
        return name
      }else{
        return ''
      }
    
  
    }
  
}

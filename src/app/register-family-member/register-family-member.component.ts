import { Component, OnInit   } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider' 
import * as moment from 'moment';
 
// import locale from 'date-fns/locale/en-US';

declare var $: any;
@Component({
  selector: 'app-register-family-member',
  templateUrl: './register-family-member.component.html',
  styleUrls: ['./register-family-member.component.css']
})
export class RegisterFamilyMemberComponent implements OnInit {
  parameterList:any=[]
  selectedFamilyId:any
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder, 
  ) { }
  ngOnInit(): void {
    this.onGetParaList()
  }


  onGetParaList(): void {


    this.service.getApiWithAuth("user/familyList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.parameterList = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onDeleteFunction(family:any){
    this.selectedFamilyId=family._id
    $('#DeleteModal').modal('show')
  }

  onYes(){
    let data = {
      familyId:this.selectedFamilyId
    }
    this.service.postApiWithAuth("user/deleteFamily", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        $('#DeleteModal').modal('hide')
        this.onGetParaList()

        // this.service.succ(success.message)
        // this.route.navigate(['/register-clickon'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
  onNextValue(){

    if(this.parameterList.length==0){
      this.service.err('Please add a member') 
      return
    }
    let data = {
      completeStep:6
    }
    this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.route.navigate(['/register-membership'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
 
}
}

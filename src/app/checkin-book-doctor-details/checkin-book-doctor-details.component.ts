import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import * as moment from 'moment';
declare var $: any;
declare function SideBarFunction(): any;

@Component({
  selector: 'app-checkin-book-doctor-details',
  templateUrl: './checkin-book-doctor-details.component.html',
  styleUrls: ['./checkin-book-doctor-details.component.css']
})
export class CheckinBookDoctorDetailsComponent implements OnInit {
  otpSubmitCheck: boolean = false
  formGroup: FormGroup
  filterGroup: FormGroup
  submitted = false
  formInvalid = false
  parametersData = []
  subParametersData = []
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass = false
  doctorList: any = []
  selectDoctor: any = ''
  slotList: any = []


  docId = ''
  orderObj:any
  doctorData:any

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
      dob: ['', [Validators.required]]

    })
    this.filterGroup = this.fb.group({
      available: ['', []],
      speciality: ['', []],
      onlinestatus: ['', []],
      offlinestatus: ['', []],
      language: ['', []],
      gender: ['', []]

    })
  }


  ngOnInit(): void {
    this.activeRoute.queryParamMap
      .subscribe((params:any) => {
        console.log(params)
        console.log({ docId: params['docId'] })
        this.orderObj = { ...params };
        console.log(this.orderObj.params.docId)
        if (this.orderObj.params.docId) {
          this.onGetData(this.orderObj.params.docId)
        }

      }
      );
  }

  onGetData(docId: any) {


    let data = {
      doctorId: docId
    }
    this.service.postApiWithAuth("user/getDoctorDetails", data, 1).subscribe(success => {
      console.log(success)
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.doctorData = success.data

        console.log(this.doctorData)
      }
      else {
        this.service.err(success.message)

      }
    }, error => {
      console.log({ error })
    })

  }

  getDate(date:any){

    if(date){
   return moment(date).format('YYYY-MM-DD')
    }else{
      return '-'
    }
  }

}

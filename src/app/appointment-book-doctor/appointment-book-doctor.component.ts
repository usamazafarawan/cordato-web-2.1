import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import * as moment from 'moment';
declare var $: any;
declare function SideBarFunction(): any; 

import { IDropdownSettings } from 'ng-multiselect-dropdown';
 
@Component({
  selector: 'app-appointment-book-doctor',
  templateUrl: './appointment-book-doctor.component.html',
  styleUrls: ['./appointment-book-doctor.component.css']
})
export class AppointmentBookDoctorComponent implements OnInit {
 

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

  languageList: any = []
  specialityList: any = []


  dropdownSettings: IDropdownSettings = {}
  dropdownList: any = [];
  selectedItems: any = [];

  LanguageSettings: IDropdownSettings = {}
  LanguageList: any = [];


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

    this.dropdownList = [
      { item_id: 1, item_text: 'Allergy & Immunology' },
      { item_id: 2, item_text: 'Anesthesiology' },
      { item_id: 3, item_text: 'Cardiology' },
      { item_id: 4, item_text: 'Critical Care' },
      { item_id: 5, item_text: 'Dermatology' },
      { item_id: 6, item_text: 'Diabetes & Endocrinology' },
      { item_id: 7, item_text: 'Emergency Medicine' },
      { item_id: 8, item_text: 'Family Medicine' },
      { item_id: 9, item_text: 'Gastroenterology' },
      { item_id: 10, item_text: 'Internal Medicine' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Nephrology' },
      { item_id: 4, item_text: 'Mezza House, Mirdif (24335) TMP' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.LanguageList = [
      { item_id: 1, item_text: 'Hindi' },
      { item_id: 2, item_text: 'English' }, 
    ];

    this.LanguageSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    SideBarFunction()
    this.onGetDoctorList()
    this.onGetLanguageList()
    this.onGetSpecialityList()
  }

  onShowDoctor() {

    console.log(this.filterGroup.value)
  }

  onReset(){
    this.filterGroup.reset() 
    this.onGetDoctorList()
    this.onGetLanguageList()
    this.onGetSpecialityList()
  }
  onGetLanguageList(): void {


    this.service.getApiWithAuth("user/getLanguage").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.languageList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })


  }

  onGetSpecialityList(): void {


    this.service.getApiWithAuth("user/getSpeciality").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.specialityList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onGetDoctorList(): void {


    this.service.getApiWithAuth("user/getDoctorList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.doctorList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })


  }

  onGetDoctorListFilter(): void {
    console.log(this.filterGroup.value)

    let data = {
      startDate: '',
      endDate: '',
      speciality: '',
      status: '',
      language: '',
      gender:''
    }

    if (this.filterGroup.value.available == 'today') {
      data.startDate = moment().format('YYYY-MM-DD')

    }
    if (this.filterGroup.value.available == 'week') {
      var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6

      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));

      data.startDate = moment(firstday).format('YYYY-MM-DD')
      data.endDate = moment(lastday).format('YYYY-MM-DD')

    }
    if (this.filterGroup.value.available == 'month') {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      data.startDate = moment(firstDay).format('YYYY-MM-DD')
      data.endDate = moment(lastDay).format('YYYY-MM-DD')

    }

    if(this.filterGroup.value.gender=='All'){
     data.gender=''
    }else{
      data.gender=this.filterGroup.value.gender
    }

    if(this.filterGroup.value.offlinestatus && this.filterGroup.value.onlinestatus){
      data.status=''
     }else if(this.filterGroup.value.offlinestatus){ 
      data.status='Offline'
     }
     else if(this.filterGroup.value.onlinestatus){ 
      data.status='Online'
     }

     if(this.filterGroup.value.language){
      data.language=this.filterGroup.value.language
     }

     if(this.filterGroup.value.speciality){
      data.speciality=this.filterGroup.value.speciality
     }

    this.service.postApiWithAuth("user/getDoctorList", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.doctorList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })


  }
  onSelect(item: any) {
    console.log({ item })
    this.selectDoctor = item
  }

  onSelectDoctor(item: any) {
    console.log({ item })
    this.selectDoctor = item
    this.onNextSelect()
  }

  onNextSelect() {

    if (!this.selectDoctor) {
      this.service.err('Please select doctor first')

      return
    }

    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}
    let obj = {
      doctorId: this.selectDoctor._id,
      selectDoctor: this.selectDoctor
    }

    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthAppLog', JSON.stringify(newObject));
    this.appProvider.current.currentAppointment = newObject
    this.route.navigate(['/appointment-book-date'])


  }

}

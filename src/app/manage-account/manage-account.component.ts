import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import * as moment from 'moment';
declare var $: any;

declare function EyeIcon(): any;

import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  zoom: number = 8;

  lat: number = 51.673858;
  lng: number = 7.815982;

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

  SearchCountryField = SearchCountryField;
  CountryISO: any = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];

  otpSubmitCheck: boolean = false
  formGroup: FormGroup
  formGroup1: FormGroup
  formGroup2: FormGroup
  formGroup3: FormGroup
  otpForm: FormGroup
  questionsAdd: FormGroup;
  questionsEdit: FormGroup;

  submitted = false
  formInvalid = false
  formInvalid1 = false
  formInvalid3 = false
  formInvalid2 = false
  parametersData = []
  subParametersData = []
  currentLat: any
  currentLong: any
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass = false
  userData: any
  phoneInvalid: any = false

  parameterList: any = []
  subParameterList: any = []
  subParameterListBackup: any = []
  selectedPara: any
  selectedSubParaids: any
  loginData: any
  selectedCountry: any = ''
  editLocation: Boolean = false
  familyList: any = []
  selectedFamilyId: any
 
  questionList:any=[]
  singleQuestion:any

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })

    this.formGroup1 = this.fb.group({
      phoneNumber: ['', [Validators.required]],

    })

    this.formGroup2 = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      conPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    })

    this.formGroup3 = this.fb.group({
      address: ['', [Validators.required]],
      searchAddress: ['', [Validators.required]],
      building: ['', []],
    })

    this.otpForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      searchText: ['', [Validators.required]]
    })
    
    this.questionsAdd = this.fb.group({
      questionName: ['',[Validators.required]],
    })
    
    this.questionsEdit = this.fb.group({
      questionName: ['',[Validators.required]],
    })

  }

  ngOnInit(): void {
    EyeIcon()
    this.onGetUserData()
    this.onGetParaList()
    this.getFamilyList()
  }

  getFamilyList(): void {
    this.service.getApiWithAuth("user/familyList").subscribe(success => {
      if (success.status == 200) {
        // console.log(success)
        // this.service.succ(success.message)
        this.familyList = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onDeleteFunction(family: any) {
    this.selectedFamilyId = family._id
    $('#DeleteModal').modal('show')
  }

  onYes() {
    let data = {
      familyId: this.selectedFamilyId
    }
    this.service.postApiWithAuth("user/deleteFamily", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        $('#DeleteModal').modal('hide')
        this.getFamilyList()

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

  getdatemonth(date: any) {
    let dates = ''
    if (date) {
      dates = moment(date).format('LL')
    }
    return dates
  }

  ondelete(subId: any, parId: any) {
    let data = {
      subParametersId: subId,
      parameterId: parId
    }
    this.service.postApiWithAuth("user/deleteUserParameters", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.onGetParaList()
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onGetUserData(): void {
    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) { 
        this.userData = success.data
        
        this.getQuestionList()

        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData = success.data
        this.currentLat = parseFloat(success.data.latitude)
        this.currentLong = parseFloat(success.data.longitude)
        this.formGroup.patchValue({
          email: success.data.email,
          firstName: success.data.firstName,
          lastName: success.data.lastName,
          phoneNumber: success.data.countryCode + '-' + success.data.mobileNumber,
          address: success.data.address,
        });

        this.formGroup1.patchValue({
          phoneNumber: success.data.mobileNumber,
        });

        this.loginData = this.appProvider.current.loginData
        let obj: any = Object.assign(CountryISO)

        if (this.loginData.country) {
          Object.keys(obj)
            .forEach((key) => {
              if (obj[key] == this.loginData.country.toLowerCase()) {
                this.selectedCountry = key
                // console.log(this.selectedCountry) 
              }
            });
        } else {
          Object.keys(obj)
            .forEach((key) => {
              if (obj[key] == 'us') {
                this.selectedCountry = key
                // console.log(this.selectedCountry)
              }
            });
        }

        let address = success.data.address.split(',')
        

        this.formGroup3.patchValue({
          address: success.data.address.replace(address[0] + ',', ''),
          searchAddress: success.data.address.replace(address[0] + ',', ''),
          building: address[0]
        });
        // this.parameterList = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  AddressStep() {
    console.log(this.formGroup1.value)
    console.log(this.formGroup1.invalid)
    // console.log(this.formGroup1.value.phoneNumber.split('-'))
    // let phone=this.formGroup1.value.phoneNumber.split('-')
    // console.log(phone)
    // console.log(phone.length)
    if (!this.formGroup1.value.phoneNumber) {
      this.phoneInvalid = true
      return
    } else {
      this.phoneInvalid = false
    }

    if (this.formGroup1.invalid) {
      this.formInvalid1 = true
      return
    }
    if (this.phoneInvalid) {
      return
    }

    this.Address()

  }

  Address() {
    let phone = this.formGroup1.value.phoneNumber
    let data = {
      countryCode: phone.dialCode,
      mobileNumber: phone.number,
      country: phone.countryCode,
    }
    this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.onGetUserData()
        $('#NumberModal').modal('hide')
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onSetLoction() {
    // this.submitted = true
    console.log(this.formGroup3.value)
    console.log(this.formGroup3.invalid)
    if (this.formGroup3.invalid) {
      this.formInvalid3 = true
      return
    }
    this.onSaveAddress()

  }

  focusFunction(varids: any) {
    var sourcePlace: any = document.getElementById(varids);
    var autocomplete = new google.maps.places.Autocomplete(sourcePlace);
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name', 'formatted_address']);
    var infowindow = new google.maps.InfoWindow();
    autocomplete.addListener('place_changed', () => {
      var placeOne = autocomplete.getPlace();
      console.log(placeOne)
      if (!placeOne.geometry) {
        window.alert("No details available for input: '" + placeOne.name + "'");
        return;
      }
      var address = '';
      if (placeOne.address_components) {
        address = [
          (placeOne.address_components[0] && placeOne.address_components[0].short_name || ''),
          (placeOne.address_components[1] && placeOne.address_components[1].short_name || ''),
          (placeOne.address_components[2] && placeOne.address_components[2].short_name || '')
        ].join(' ');
      }
      // this.latitude = placeOne.geometry.location.lat();
      // this.longitude = placeOne.geometry.location.lng();

      this.getFormatedAddress(placeOne.geometry.location.lat(), placeOne.geometry.location.lng())

      // console.log('placeOne.formatted_address',placeOne.formatted_address,this.latitude,this.longitude)

    });
  }

  getFormatedAddress(lat: any, lng: any) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder: any = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, (results: any, status: any) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          console.log("Location: " + results[0].formatted_address);
          this.appProvider.current.currentLocation = {
            address: results[0].formatted_address,
            latitude: lat,
            longitude: lng
          }
          this.currentLat = lat
          this.currentLong = lng
          this.formGroup3.patchValue({
            searchAddress: results[0].formatted_address,
            address: results[0].formatted_address,
          });
        }
      }
    });
  }

  onSaveAddress() {

    let data: any = {
      latitude: this.currentLat,
      longitude: this.currentLong,

    }
    if (this.formGroup3.value.building) {
      data.address = this.formGroup3.value.building + ',' + this.formGroup3.value.address
    } else {
      data.address = this.formGroup3.value.address

    }

    this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.onGetUserData()
        this.editLocation = false
        $('#LocationModal').modal('hide')
        // this.route.navigate(['/register-medication'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onSubmitPass() {
    this.submitted = true
    console.log(this.formGroup2.value)
    console.log(this.formGroup2.invalid)
    if (this.formGroup2.invalid) {
      this.formInvalid2 = true
      return
    }
    if (this.formGroup2.value.newPassword != this.formGroup2.value.conPassword) {
      this.confirmPass = true
      this.formInvalid2 = true
    }
    else {
      let data = {
        // email: this.formGroup2.value.email,
        newPassword: this.formGroup2.value.newPassword,
        oldPassword: this.formGroup2.value.oldPassword
      }
      this.service.postApiWithAuth("user/changePassword", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ(success.message)
          this.formGroup2.reset()
          this.formInvalid2 = false

        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
  }

  onChangePass() {
    this.confirmPass = false
  }

  onGetParaList(): void {
    this.service.getApiWithAuth("user/getParametersList").subscribe(success => {
      if (success.status == 200) {
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

  onGetSubParaList(ids: any): void {
    let data = {
      parameterId: ids
    }
    this.service.postApiWithAuth("user/subParametersWithStatus", data, 1).subscribe(success => {
      if (success.status == 200) { 
        // this.service.succ(success.message)
        this.subParameterList = success.data
        this.subParameterListBackup = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onSelectParameter(para: any) {
    this.selectedPara = para
    this.onGetSubParaList(para._id)
    $('#MedicationModal').modal('show')
  }

  onInputCheckChage(item: any) {
    console.log(item.isSelected)

    let isSelected = !item.isSelected
    console.log(isSelected)
    let index1 = this.subParameterList.map((it: any) => { return it._id }).indexOf(item._id)


    let index2 = this.subParameterListBackup.map((it: any) => { return it._id }).indexOf(item._id)

    console.log(index1)

    this.subParameterList[index1].isSelected = isSelected

    this.subParameterListBackup[index2].isSelected = isSelected

    console.log(this.subParameterList)
    console.log(this.subParameterListBackup)
  }

  onNextSubParameters() {

    let selectedParams = this.subParameterList.filter((it: any) => it.isSelected)
    let arrayVale = []
    for (let index = 0; index < selectedParams.length; index++) {
      arrayVale.push(selectedParams[index]._id)
    }
    let selectedParamsIds = arrayVale.toString()
    this.selectedSubParaids = selectedParamsIds
    console.log(selectedParams)
    console.log(selectedParamsIds)
    this.onSaveSelectedParameter()
  }

  onSaveSelectedParameter() {
    let data = {
      parameterId: this.selectedPara['_id'],
      selectedSubParameters: this.selectedSubParaids
    }
    this.service.postApiWithAuth("user/userUpdateParameters", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.selectedPara = null
        this.selectedSubParaids = null
        $('#MedicationModal').modal('hide')
        this.onGetParaList()
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onFileChange(event: any) {



    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      // console.log(this.formGroup1.value.fileSource)
      const formData = new FormData();
      formData.append('file', file);
      this.service.formdataApi("user/fileUpload", formData).subscribe(success => {
        console.log(success)
        if (success.status == 200) {
          // this.filepath=success.data
          this.onSave(success.data)
          // this.formGroup1.patchValue({
          //   fileSource: success.data
          // });

        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
      // this.submit()
    }

  }

  onSave(path: any) {
    // let phone=this.formGroup1.value.phoneNumber.split('-')
    let data = {
      profilePic: path,
      // mobileNumber:phone[1],
    }
    this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.onGetUserData()
        $('#NumberModal').modal('hide')
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onEditLocation() {
    this.editLocation = true
  }

  onSearch() {
    console.log(this.otpForm.value)
    let searchText = this.otpForm.value.searchText.trim().toLowerCase()
    let appValue = JSON.stringify(this.subParameterListBackup)
    let appValueData = JSON.parse(appValue)
    if (searchText) {
      console.log('search if')
      let app = Object.assign([], appValueData)
      let applist = app.filter((it: any) => {
        // console.log(it.firstName)
        if (it) {
          let date = moment(it.date).format('YYYY-MM-DD')
          let name = (it.name).toLowerCase()
          if (name && name.includes(searchText)) {
            return it
          }
        }
      })
      this.subParameterList = applist
    } else {
      console.log('search else')
      console.log(this.subParameterListBackup)
      this.subParameterList = this.subParameterListBackup
    }
  }

  addQuestion() { 
    this.submitted = true 
    if (this.questionsAdd.invalid) {
      this.formInvalid = true
      return
    }
    let data = {
      question: this.questionsAdd.value.questionName,
      adddedBy:this.userData._id
    } 
    this.service.postApiWithAuth("user/addCheckInQuestion", data, 1).subscribe({
      next: (success: any) => {
        if (success.status == 200) {
          this.service.succ(success.message) 
          $('#QuestionsAddModal').modal('hide')
          this.getQuestionList()
        } 
        else { 
          this.service.err(success.message)
        }
      },
      error: (error: any) => {
        console.log({ error })
      }
    })
  }

  getQuestionList() {
    let data ={
      userId:this.userData._id
    }
    this.service.postApiWithAuth("user/checkInQuestionList",data,1).subscribe(success => {
      if (success.status == 200) {
        this.questionList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  questionDeletId(x:any){
    this.singleQuestion = x
    $('#QuestionsDeleteModal').modal('show')
  }

  questionsDelete(){
    let data = {
      _id: this.singleQuestion._id
    }
    console.log(data) 
    this.service.postApiWithAuth("user/removeCheckInQuestion", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          this.service.succ(success.message) 
          this.getQuestionList() 
          $('#QuestionsDeleteModal').modal('hide');
        }
        else { 
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  questionEditId(x:any){
    this.singleQuestion = x 
    console.log("this.singleQuestion",this.singleQuestion)
    this.questionsEdit.controls['questionName'].setValue(x.question)
    $('#QuestionsEditModal').modal('show')
  }

  editQuestion() { 
    this.submitted = true 
    if (this.questionsEdit.invalid) {
      this.formInvalid = true
      return
    }
    let data = {
      question: this.questionsEdit.value.questionName,
      _id:this.singleQuestion._id
    }
    console.log("Data::::",data);
    this.service.postApiWithAuth("user/updateCheckInQuestion", data, 1).subscribe({
      next: (success: any) => {
        console.log("Data success::::",success)
        if (success.status == 200) {
          this.service.succ(success.message) 
          $('#QuestionsEditModal').modal('hide')
          this.getQuestionList()
        } 
        else { 
          this.service.err(success.message)
        }
      },
      error: (error: any) => {
        console.log({ error })
      }
    })
  }



}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

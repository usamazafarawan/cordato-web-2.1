import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.css']
})
export class AppointmentBookComponent implements OnInit {

  otpSubmitCheck: boolean = false
  formGroup: FormGroup
  formGroup1: FormGroup
  formGroup2: FormGroup
  formGroup3: FormGroup
  formGroup4: FormGroup
  submitted = false
  formInvalid = false
  formInvalid1= false
  formInvalid3= false
  formInvalid2= false
  parametersData = []
  subParametersData = []
  currentLat:any
  currentLong:any
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass=false
  userData:any
  phoneInvalid:any=false
  parameterList: any = []
  subParameterList: any = []
  subParameterListBackup: any = []
  selectedPara:any
  selectedSubParaids:any
  filepath:any

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
      pharmacy: ['', [Validators.required]],
      insurance: ['', []],
      ownPharmacy: ['no', [Validators.required]],

    })
    this.formGroup1 = this.fb.group({
      phoneNumber: ['', [Validators.required]],

    })
    this.formGroup2 = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      conPassword: ['', [Validators.required]]

    })

    this.formGroup3 = this.fb.group({
      address: ['', [Validators.required]],
      searchAddress: ['', [Validators.required]],
      building: ['', [Validators.required]],

    })

    this.formGroup4 = this.fb.group({
      fileSource: ['', [Validators.required]]

    })
  }

  ngOnInit(): void {
    this.onGetUserData()
  }

  onGetUserData(): void {
    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.userData=success.data
        this.appProvider.current.loginData=success.data
        this.currentLat=success.data.latitude
        this.currentLong=success.data.longitude
        this.formGroup.patchValue({
          email: success.data.email,
          firstName:success.data.firstName,
          lastName:success.data.lastName,
          phoneNumber:success.data.countryCode+'-'+success.data.mobileNumber,
          address:success.data.address,
        });
        this.formGroup1.patchValue({
          phoneNumber:success.data.countryCode+'-'+success.data.mobileNumber,
        });
        let address=success.data.address.split(',')
        console.log(address)
        this.formGroup3.patchValue({
          address:success.data.address.replace(address[0]+',',''),
          searchAddress:success.data.address.replace(address[0]+',',''),
          building:address[0]
        });
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  AddressStep(){
    console.log(this.formGroup1.value)
    console.log(this.formGroup1.invalid)
    console.log(this.formGroup1.value.phoneNumber.split('-'))
    let phone=this.formGroup1.value.phoneNumber.split('-')
    console.log(phone)
    console.log(phone.length)
    if(this.formGroup1.value.phoneNumber && phone.length<2){
      this.phoneInvalid=true
    }else{
      this.phoneInvalid=false
    }
   
    if (this.formGroup1.invalid) {
      this.formInvalid1 = true
      return
    }
    if(this.phoneInvalid){
      return
    }
    this.Address()
  }

  Address(){
    let phone=this.formGroup1.value.phoneNumber.split('-')
      $('#NumberModal').modal('hide')
      this.formGroup.patchValue({
        phoneNumber: phone[0]+'-'+phone[1]
      });
    }

    onSetLoction(){
      // this.submitted = true
      console.log(this.formGroup3.value)
      console.log(this.formGroup3.invalid)
      if (this.formGroup3.invalid) {
        this.formInvalid3 = true
        return
      }
      this.onSaveAddress()
    }

    onSaveAddress(){
      this.formGroup.patchValue({
        address: this.formGroup3.value.building+','+this.formGroup3.value.address
      });
      $('#LocationModal').modal('hide')
    }

    focusFunction(varids: any) {
      var sourcePlace:any = document.getElementById(varids);
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
        this.getFormatedAddress( placeOne.geometry.location.lat(),placeOne.geometry.location.lng())
      });
    }

    getFormatedAddress(lat:any, lng:any) {
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder:any = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, (results:any, status:any) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log("Location: " + results[0].formatted_address);
            this.appProvider.current.currentLocation={
              address:results[0].formatted_address,
              latitude:lat,
              longitude:lng
            }
            this.currentLat=lat
            this.currentLong=lng
            this.formGroup3.patchValue({
              searchAddress: results[0].formatted_address,
              address:results[0].formatted_address,
            });
          }
        }
      });
    }

    onEditAddress(){
      let address=this.formGroup.value.address.split(',')
      let address1=this.formGroup.value.address
      console.log(address)
      this.formGroup3.patchValue({
        address:address1.replace(address[0]+',',''),
        searchAddress:address1.replace(address[0]+',',''),
        building:address[0]
      });
      console.log(this.formGroup3.value)
      $('#LocationModal').modal('show')
    }

    onBookAppointment(){
      let object=this.appProvider.current.currentAppointment?this.appProvider.current.currentAppointment:{}

      console.log(this.formGroup.value)
      let obj={
        firstName:this.formGroup.value.firstName,
        lastName:this.formGroup.value.lastName,
        email:this.formGroup.value.email,
        address:this.formGroup.value.address,
        latitude:this.currentLat,
        longitude:this.currentLong,
        ownPharmacy:this.formGroup.value.ownPharmacy,
        pharmacy:this.formGroup.value.pharmacy,
        phoneNumber:this.formGroup.value.phoneNumber,
        insuranceCard:this.filepath
      }

      let newObject=Object.assign(object,obj)
      console.log(newObject)

      localStorage.setItem('healthAppLog', JSON.stringify(newObject));
      this.appProvider.current.currentAppointment = newObject
      this.route.navigate(['/appointment-book-mdication'])
    }

    onFileChange(event:any) { 
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log(file)
        this.filepath=''
        this.formGroup4.patchValue({
          fileSource: file
        });
        this.submit()
      }
    }
  
    submit(){
      console.log(this.formGroup4.value.fileSource)
      const formData = new FormData();
      formData.append('file', this.formGroup4.value.fileSource);
      this.service.formdataApi("user/fileUpload", formData).subscribe(success => {
        console.log(success)
        if (success.status == 200) {
          this.filepath=success.data
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
 
    onRemoveImage(){
      this.filepath=''
      this.formGroup4.reset()
    }

}

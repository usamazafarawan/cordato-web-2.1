import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { AppProvider } from '../app.provider'
import * as moment from 'moment';

import { MouseEvent } from '@agm/core';


@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.component.html',
  styleUrls: ['./register-personal.component.css']
})
export class RegisterPersonalComponent implements OnInit {

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
  submitted = false
  formInvalid = false
  formInvalid1 = false
  parametersData = []
  subParametersData = []
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass = false
  latitude: any
  longitude: any
  step = 1
  currentLat: any = 28.6258099
  currentLong: any = 77.3773401
  filevalidation = false
  raceList = []
  phoneInvalid = false
  filepath = ''
  loginData: any
  selectedCountry: any = ''

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      address: ['', [Validators.required]],
      searchAddress: ['', [Validators.required]],
      building: ['', []],
    })
    this.formGroup1 = this.fb.group({
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      // idProof: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
      raceId: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    let obj: any = Object.assign(CountryISO)
    this.onGetRaceList()

    this.loginData = this.appProvider.current.loginData

    if (this.loginData.country) {
      Object.keys(obj)
        .forEach((key) => {
          if (obj[key] == this.loginData.country.toLowerCase()) {
            this.selectedCountry = key
          }
        });
    } else {
      Object.keys(obj)
        .forEach((key) => {
          if (obj[key] == 'us') {
            this.selectedCountry = key
          }
        });
    }

    this.formGroup1.patchValue({
      address: this.loginData.address,
      searchAddress: this.loginData.searchAddress,
      building: this.loginData.building,
      phoneNumber: this.loginData.mobileNumber,
      raceId: this.loginData.raceId,
      fileSource: this.loginData.idProof
    });

    this.formGroup.patchValue({
      address: this.loginData.address,
      searchAddress: this.loginData.searchAddress,
      building: this.loginData.building,
    });

    if (!this.filepath.trim()) {
      this.filepath = this.loginData.idProof
    }
    if (this.loginData.address) {

      this.currentLat = parseFloat(this.loginData.latitude)
      this.currentLong = parseFloat(this.loginData.longitude)
    } else {
      this.getAddressData()
    }
  }
 

  onGetRaceList(): void {
    this.service.getApiWithAuth("user/getRacesList").subscribe(success => {
      if (success.status == 200) {

        this.raceList = success.data

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  getAddressData() {
    this.service.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.getFormatedAddress(pos.lat, pos.lng)
      this.currentLat = pos.lat
      this.currentLong = pos.lng
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude
      });
    }
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
          this.formGroup.patchValue({
            searchAddress: results[0].formatted_address,
            address: results[0].formatted_address,
          });
          this.formGroup1.patchValue({
            // searchAddress: results[0].formatted_address,
            address: results[0].formatted_address,



          });
        }
      }
    });
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
      var name = placeOne.name
      if (placeOne.address_components) {
        address = [
          (placeOne.address_components[0] && placeOne.address_components[0].short_name || ''),
          (placeOne.address_components[1] && placeOne.address_components[1].short_name || ''),
          (placeOne.address_components[2] && placeOne.address_components[2].short_name || '')
        ].join(' ');
      }
      this.latitude = placeOne.geometry.location.lat();
      this.longitude = placeOne.geometry.location.lng();

      console.log("latitude", this.latitude)
      console.log("latitude", this.longitude)

      // this.getFormatedAddress(this.latitude, this.longitude)
      this.appProvider.current.currentLocation = {
        address: address,
        latitude: this.latitude,
        longitude: this.longitude



      }

      this.currentLat = this.latitude
      this.currentLong = this.longitude
      this.formGroup.patchValue({
        searchAddress: name + ',' + address,
        address: name + ',' + address,
      });
      this.formGroup1.patchValue({
        // searchAddress: results[0].formatted_address,
        address: name + ',' + address,
      });
      // console.log('placeOne.formatted_address',placeOne.formatted_address,this.latitude,this.longitude)

    });
  }

  onStep() {
    this.step = this.step == 1 ? 2 : 1
  }


  onFileChange(event: any) {



    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.filepath = ''
      this.filevalidation = false
      this.formGroup1.patchValue({
        fileSource: file
      });
      // this.submit()
    }

  }

  submit() {

    console.log(this.formGroup1.value.fileSource)
    const formData = new FormData();
    formData.append('file', this.formGroup1.value.fileSource);
    this.service.formdataApi("user/fileUpload", formData).subscribe(success => {
      console.log(success)
      if (success.status == 200) {
        this.filepath = success.data
        this.onSave(this.filepath)
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

  }

  onSetLoction() {
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }

    if (this.formGroup.value.building) {
      this.formGroup1.patchValue({

        address: this.formGroup.value.building + ',' + this.formGroup.value.address
      });
    } else {
      this.formGroup1.patchValue({

        address: this.formGroup.value.address
      });
    }


    this.onStep()
  }

  onSaveStep() {
    this.phoneInvalid = false
    console.log(this.formGroup1)
    console.log(this.formGroup1.value)
    console.log(this.formGroup1.invalid)
    // console.log(this.formGroup1.value.phoneNumber.split('-'))
    // let phone = this.formGroup1.value.phoneNumber.split('-')
    if (!this.formGroup1.value.phoneNumber) {
      this.phoneInvalid = true
      return
    } else {
      this.phoneInvalid = false
    }
    if (!this.formGroup1.value.fileSource) {
      this.filevalidation = true
    }
    if (this.formGroup1.invalid) {
      this.formInvalid1 = true
      return
    }


    if (this.filepath.includes('https')) {
      this.onSave(this.filepath)
    } else {
      this.submit()
    }



  }

  onSave(filepath: any) {
    let phone = this.formGroup1.value.phoneNumber
    let data = {
      latitude: this.currentLat,
      longitude: this.currentLong,
      address: this.formGroup1.value.address,
      country: phone.countryCode,
      countryCode: phone.dialCode,
      mobileNumber: phone.number,
      raceId: this.formGroup1.value.raceId,
      idProof: filepath,
      completeStep: 3
    }
    this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ('data saved successfully')
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData = success.data
        this.route.navigate(['/register-medication'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

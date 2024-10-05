import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;

@Component({
  selector: 'app-appointment-book-vitals',
  templateUrl: './appointment-book-vitals.component.html',
  styleUrls: ['./appointment-book-vitals.component.css']
})
export class AppointmentBookVitalsComponent implements OnInit {
  formGroup: FormGroup
  formGroup1: FormGroup
  formInvalid=false
  filepath:any
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      height: ['', []],
      weight: ['', []],
      temprature: ['', []],
      pulse: ['', []],
      systolic: ['', []],
      distolic: ['', []],
      ecg: ['', []]

    })
    this.formGroup1 = this.fb.group({
      fileSource: ['', [Validators.required]]

    })
  }

  ngOnInit(): void {
    let object=this.appProvider.current.currentAppointment?this.appProvider.current.currentAppointment:{}
    this.formGroup.patchValue({
      height: object.height,
      weight:object.weight,
      temprature:object.temprature,
      pulse:object.pulse,
      systolic:object.systolic,
      distolic:object.distolic,
      ecg:object.ecg,
    });
  }
  

    
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.submit(file)
      this.filepath=''
      this.formGroup1.patchValue({
        fileSource: file
      });
     
    }

  }

  submit(file:any){

    console.log(this.formGroup1.value.fileSource)
    const formData = new FormData();
    formData.append('file', file);
    this.service.formdataApi("user/fileUpload", formData).subscribe(success => {
      console.log(success)
      if (success.status == 200) {
        this.filepath=success.data
        // this.onSave(this.filepath)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }
  onNext(){
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    this.onSave('')
  }

  onSave(file:any){

  

    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}
    console.log(this.formGroup.value)
    let obj = {
      height: this.formGroup.value.height,
      weight:this.formGroup.value.weight,
      temprature:this.formGroup.value.temprature,
      pulse:this.formGroup.value.pulse,
      systolic:this.formGroup.value.systolic,
      distolic:this.formGroup.value.distolic,
      ecg:this.filepath,
    }

    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthAppLog', JSON.stringify(newObject));
    this.appProvider.current.currentAppointment = newObject
    this.route.navigate(['/appointment-book-doctor'])
  }
}

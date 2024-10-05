import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
declare function uploader():any;
import * as moment from 'moment';
@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {

  public VaccinationForm = true
  public VaccinationSecondForm = true

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
  userData:any


  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      vaccination: ['No', [Validators.required, ]],
      vaccinationDate: [moment().format('YYYY-MM-DD'), []],
      vaccinationReport: ['', []]

    })

  }

  ngOnInit(): void {
    this.userData=this.appProvider.current.loginData
    this.onGetUserData()
    uploader();
  }
  removeReport(){
    this.formGroup.patchValue({
      vaccinationReport: ''
    });

  }

  onViewImage(userData:any):void{
  window.open(userData.vaccinationReport)
  }
  onGetUserData(): void {


    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.userData=success.data
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData=success.data
       
        this.formGroup.patchValue({
          vaccination:success.data.vaccination,
          vaccinationDate: success.data.vaccinationDate && success.data.vaccinationDate.trim()?moment(success.data.vaccinationDate).format('YYYY-MM-DD'):moment().format('YYYY-MM-DD'),
          vaccinationReport: success.data.vaccinationReport,
        });

        if(this.userData.vaccination=='Yes'){
          
          
          this.VaccinationSecondForm=true
          this.VaccinationForm=false
        }else{
          
          this.VaccinationSecondForm=false
          this.VaccinationForm=true
        }
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }
  onFileChange(event:any) {

  

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      // console.log(this.formGroup1.value.fileSource)
      const formData = new FormData();
      formData.append('file', file);
      this.service.formdataApi("user/fileUpload", formData).subscribe(success => {
        console.log(success)
        if (success.status == 200) {
          this.formGroup.patchValue({
            vaccinationReport: success.data
          });
  
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
  changeVaccination(e: any) {
    console.log(e.target.value);
    if(e.target.value==='Yes'){
      this.VaccinationSecondForm=true
      this.VaccinationForm=false
    }
    if(e.target.value==='No'){
      this.VaccinationSecondForm=false
      this.VaccinationForm=true

    }
}

onSave():void{
  this.submitted = true
        console.log(this.formGroup.value)
        console.log(this.formGroup.invalid)
        if (this.formGroup.invalid) {
          this.formInvalid= true
          return
        }
      if(this.formGroup.value.vaccination=='Yes'){
            if(!this.formGroup.value.vaccinationDate.trim()){
              this.service.err('Please enter vaccination date')
              return
            }
            if(!this.formGroup.value.vaccinationReport.trim()){
              this.service.err('Please upload vaccination report')
              return
            }
        }
    
          let data = {
            vaccination: this.formGroup.value.vaccination,
            vaccinationDate:this.formGroup.value.vaccination=='Yes'?moment(this.formGroup.value.vaccinationDate).format('YYYY-MM-DD'):' ',
            vaccinationReport:this.formGroup.value.vaccination=='Yes'?this.formGroup.value.vaccinationReport:' '
          }
          this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
            if (success.status == 200) {
              console.log(success)
              // this.service.succ(success.message)
              
              this.onGetUserData()
              this.formInvalid=false
              this.formGroup.reset()
              if(data.vaccination=='Yes'){
                this.formGroup.patchValue({
                  vaccination: data.vaccination
                });
                $('#vacinationYes').modal('show');
                this.VaccinationSecondForm=true
                this.VaccinationForm=false;
                

                
              }else{
                this.formGroup.patchValue({
                  vaccination: data.vaccination
                });
                this.VaccinationSecondForm=false
                this.VaccinationForm=true
                $('#vacinationNo').modal('show');
              }

             
      
            }
            else {
              this.service.err(success.message)
            }
          }, error => {
            console.log({ error })
          })
        
}
}

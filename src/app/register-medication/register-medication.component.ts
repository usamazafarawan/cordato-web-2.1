import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import * as moment from 'moment';



declare var $:any
// declare function MedicationList(): any;

@Component({
  selector: 'app-register-medication',
  templateUrl: './register-medication.component.html',
  styleUrls: ['./register-medication.component.css']
})
export class RegisterMedicationComponent implements OnInit {
 
  otpForm: FormGroup
  parameterList: any = []
  subParameterList: any = []
  subParameterListBackup: any = []
  selectedPara:any
  selectedSubParaids:any
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { 

    this.otpForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      searchText: ['', [Validators.required]]
    })
  }

  ngOnInit() {

    // MedicationList()
    this.onGetParaList()

  }


  onGetParaList(): void {


    this.service.getApiWithAuth("user/getParametersList").subscribe(success => {
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

  ondelete(subId:any,parId:any){

    let data={
      subParametersId:subId,
      parameterId:parId
    }
    this.service.postApiWithAuth("user/deleteUserParameters",data,1).subscribe(success => {
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

  onGetSubParaList(ids:any): void {
    let data={
      parameterId:ids
    }
    this.service.postApiWithAuth("user/subParametersWithStatus",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
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
  onSelectParameter(para:any){
    this.selectedPara=para
    this.onGetSubParaList(para._id)
    $('#MedicationModal').modal('show')
  }

  onInputCheckChage(item:any){
    console.log(item.isSelected)

    let isSelected=!item.isSelected
    console.log(isSelected)
    let index1=this.subParameterList.map((it:any)=>{return it._id}).indexOf(item._id)


    let index2=this.subParameterListBackup.map((it:any)=>{return it._id}).indexOf(item._id)

    console.log(index1)

    this.subParameterList[index1].isSelected=isSelected

    this.subParameterListBackup[index2].isSelected=isSelected

    console.log(this.subParameterList)
    console.log(this.subParameterListBackup)
  }

    onNextSubParameters(){
      // this.subParameterList = []
    let selectedParams=this.subParameterListBackup.filter((it:any)=>it.isSelected)

    let arrayVale=[]

    for (let index = 0; index < selectedParams.length; index++) {
      // const element = array[index];

      arrayVale.push(selectedParams[index]._id)
      
    }

    let selectedParamsIds=arrayVale.toString()
    this.selectedSubParaids=selectedParamsIds
    console.log(selectedParams)
    console.log(selectedParamsIds)
    this.onSaveSelectedParameter()
   

  }

  onSaveSelectedParameter(){
    let data={
      parameterId:this.selectedPara['_id'],
      selectedSubParameters:this.selectedSubParaids
    }
    this.service.postApiWithAuth("user/userUpdateParameters",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.selectedPara=null
        this.selectedSubParaids=null
        $('#MedicationModal').modal('hide')
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

  onNextValue(){
      let data = {
        completeStep:4
      }
      this.service.postApiWithAuth("user/userUpdateDetails", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          // this.service.succ(success.message)
          this.route.navigate(['/register-family-member'])
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
   
  }

  ngOnDestroy(){
    $('#MedicationModal').modal('hide')
  }

  onSearch(){
    console.log(this.otpForm.value)


    let searchText=this.otpForm.value.searchText.trim().toLowerCase()

    let appValue=JSON.stringify(this.subParameterListBackup)
    let appValueData=JSON.parse(appValue)
    if(searchText){

      console.log("searchText",searchText)

      console.log('search if')
      let app=Object.assign([],appValueData)

      let applist=app.filter((it:any)=>{


        // console.log(it.firstName)
        if(it){
          let date= moment(it.date).format('YYYY-MM-DD')
          let name=(it.name).toLowerCase()
          if(name && name.includes(searchText)){
            
              return it
             
          }
          
        }
          



      })
      this.subParameterList=applist

      

    }else{
      console.log('search else')
      console.log(this.subParameterListBackup)
      this.subParameterList=this.subParameterListBackup
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
declare function MedicationList(): any;  
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-book-medication',
  templateUrl: './appointment-book-medication.component.html',
  styleUrls: ['./appointment-book-medication.component.css']
})
export class AppointmentBookMedicationComponent implements OnInit {


  parameterList: any = []
  subParameterList: any = []
  subParameterListBackup: any = []
  selectedPara:any
  selectedSubParaids:any
  otpForm: FormGroup
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.otpForm = this.fb.group({
      searchText: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    MedicationList()
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

  onNext(){

    let selectedIds=[]
    console.log(this.parameterList)

    let params=this.parameterList.map((it:any)=>{
      if(it.selectedSubParameters && it.selectedSubParameters.subparametersname.length>0){
        return it

      }
    })
    params=params.filter((it:any)=>it)

    for (let index = 0; index < params.length; index++) {
      const element = params[index];
      const subparametersname=element.selectedSubParameters.subparametersname

      for (let indexx = 0; indexx < subparametersname.length; indexx++) {
        const elementt = subparametersname[indexx];
        selectedIds.push({
          subParametersId:elementt._id,
          parameterId:element._id
        })
        
      }
      
    }
    console.log({params,selectedIds})
    let object=this.appProvider.current.currentAppointment?this.appProvider.current.currentAppointment:{}

    // console.log(this.formGroup.value)
      let obj={
        selectedIds:selectedIds,
      }

      let newObject=Object.assign(object,obj)
      console.log(newObject)
      // debugger
      localStorage.setItem('healthAppLog', JSON.stringify(newObject));
      this.appProvider.current.currentAppointment = newObject
      this.route.navigate(['/appointment-book-reason'])
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

  onSearch(){
    console.log(this.otpForm.value)


    let searchText=this.otpForm.value.searchText.trim().toLowerCase()

    let appValue=JSON.stringify(this.subParameterListBackup)
    let appValueData=JSON.parse(appValue)
    if(searchText){
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

import { Component, OnInit   } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider' 
import * as moment from 'moment';
 
// import locale from 'date-fns/locale/en-US';

declare var $: any;
@Component({
  selector: 'app-register-family-member-add',
  templateUrl: './register-family-member-add.component.html',
  styleUrls: ['./register-family-member-add.component.css']
})
export class RegisterFamilyMemberAddComponent implements OnInit {

  public EnterDeathReason = false
  otpSubmitCheck: boolean = false
  formGroup: FormGroup
  otpForm: FormGroup
  submitted = false
  formInvalid = false
  parametersData = []
  subParametersData = []
  activeId = ''
  activeSubId = ''
  editId = ''
  confirmPass = false
  loginData: any 
  parameterList:any=[]
  subParameterListBackup:any=[]
  subParameterList:any=[]
  selectedPara:any=[]
  selectedSubParaids:any=[]
  selectedSubParameters:any=[]
  orderObj: any = {}
  
 
  
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
    this.formGroup = this.fb.group({
      relation: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birthYear: ['', [Validators.required,Validators.pattern('^[0-9]{4}$')]],
      aliveStatus: ['', [Validators.required]],
      deathYear: ['',[Validators.pattern('^[0-9]{4}$')]],
      causesOfDeath: ['']

    })
 

  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap
    .subscribe((params: any) => {
      console.log(params)
      console.log({ familyId: params['familyId'] })
      this.orderObj = { ...params };
      console.log(this.orderObj.params.familyId)

    }
    );
    this.onGetParaList()
  }


  onGetParaList(): void {


    this.service.getApiWithAuth("user/getParametersListFamily").subscribe(success => {
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
  Deathreason(e: any) {
    console.log(e.target.value);
    if(e.target.value==='Living'){
      this.EnterDeathReason=false
    }
    if(e.target.value==='Dead'){
      this.EnterDeathReason=true
    }
  }
  onSave() {
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }
    // if(this.selectedSubParaids.length==0){
    //   this.service.err('Please add condition parameters')
    //   return
    // }
    else {
      let data = {
        aliveStatus: this.formGroup.value.aliveStatus,
        birthYear: this.formGroup.value.birthYear,
        causesOfDeath: this.formGroup.value.causesOfDeath,
        deathYear: this.formGroup.value.deathYear,
        name:this.formGroup.value.name,
        relation:this.formGroup.value.relation,
        parameterId:this.parameterList[0]._id,
        selectedSubParameters:this.selectedSubParaids.toString()
        // completeStep: 2
      }
      this.service.postApiWithAuth("user/addFamilymember", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)

          if(this.orderObj.params.mang){
            this.route.navigate(['/manage-account'])
          }else{
            this.route.navigate(['/register-family-member'])
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

  ondelete(subId:any,parId:any){

    // let data={
    //   subParametersId:subId,
    //   parameterId:parId
    // }
    // this.service.postApiWithAuth("user/deleteUserParameters",data,1).subscribe(success => {
    //   if (success.status == 200) {
    //     console.log(success)
    //     // this.service.succ(success.message)
    //     this.onGetParaList()
    //     // this.route.navigate(['/register-personal'])
    //   }
    //   else {
    //     this.service.err(success.message)
    //   }
    // }, error => {
    //   console.log({ error })
    // })

    let datavalue=this.selectedSubParameters
    this.selectedSubParameters=datavalue.filter((it:any)=>it._id!=subId)
    this.selectedSubParaids=this.selectedSubParaids.filter((it:any)=>it!=subId)



  }

  onGetSubParaList(ids:any): void {



    let data={
      parameterId:ids
    }
    this.service.postApiWithAuth("user/subParametersWithStatusFamily",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)

        let datavalue=success.data

        datavalue=datavalue.map((it:any)=>{

          let index=this.selectedSubParaids.indexOf(it._id)

          it.isSelected=index==-1?false:true

          return it
        })

        
        this.subParameterList = datavalue
        this.subParameterListBackup = datavalue
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

    // let selectedParamsIds=arrayVale.toString()
    this.selectedSubParaids=arrayVale
    // console.log(selectedParams)
    // console.log(selectedParamsIds)
    this.selectedSubParameters=selectedParams
    $('#MedicationModal').modal('hide')
    // this.onSaveSelectedParameter()
   

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
        this.selectedSubParaids=[]
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

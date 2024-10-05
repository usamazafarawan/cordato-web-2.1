import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import * as moment from 'moment';

// import locale from 'date-fns/locale/en-US';

declare var $: any;
@Component({
  selector: 'app-register-family-member-edit',
  templateUrl: './register-family-member-edit.component.html',
  styleUrls: ['./register-family-member-edit.component.css']
})
export class RegisterFamilyMemberEditComponent implements OnInit {

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
  orderObj: any = {}
  parameterList: any = []
  subParameterListBackup: any = []
  subParameterList: any = []
  selectedPara: any = []
  selectedSubParaids: any = []
  selectedSubParameters: any = []




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
        if (this.orderObj.params.familyId) {
          this.onGetAppointment(this.orderObj.params.familyId)
          this.onGetParaList(this.orderObj.params.familyId)
        }

      }
      );

  }

  onGetAppointment(id: any) {

    let data = {
      familyId: id
    }
    this.service.postApiWithAuth("user/familyDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)

        this.formGroup.patchValue({
          aliveStatus: success.data.aliveStatus,
          birthYear: success.data.birthYear,
          causesOfDeath: success.data.causesOfDeath,
          deathYear: success.data.deathYear,
          name: success.data.name,
          relation: success.data.relation,


        })

        if(success.data.aliveStatus=='Dead'){
          this.EnterDeathReason = true
        }else{
          this.EnterDeathReason = false
        }
        // this.appointmetmentData = success.data
        // this.appointmetmentDataBackup=success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


  onGetParaList(id: any): void {

    let data = {
      familyId: id
    }
    this.service.postApiWithAuth("user/getParametersListFamilyEdit", data, 1).subscribe(success => {
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
    if (e.target.value === 'Living') {
      this.EnterDeathReason = false
    }
    if (e.target.value === 'Dead') {
      this.EnterDeathReason = true
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
    else {
      let data = {
        aliveStatus: this.formGroup.value.aliveStatus,
        birthYear: this.formGroup.value.birthYear,
        causesOfDeath: this.formGroup.value.causesOfDeath,
        deathYear: this.formGroup.value.deathYear,
        name: this.formGroup.value.name,
        relation: this.formGroup.value.relation,
        familyId:this.orderObj.params.familyId
        // completeStep: 2
      }
      this.service.postApiWithAuth("user/updateFamilymember", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)

          if(this.orderObj.params.mang){
            this.route.navigate(['/manage-account'])
          }else{
            this.route.navigate(['/register-family-member'])
          }
         
          // this.service.succ('data saved successfully')
          // localStorage.setItem('healthlogin', JSON.stringify(success.data));
          // this.appProvider.current.loginData = success.data
          // this.route.navigate(['/register-personal'])
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
  }

  ondelete(subId: any, parId: any) {

    let data={
      subParametersId:subId,
      parameterId:parId,
      familyId:this.orderObj.params.familyId
    }
    this.service.postApiWithAuth("user/deleteFamilyParameters",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.onGetParaList(this.orderObj.params.familyId)
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

    // let datavalue = this.selectedSubParameters
    // this.selectedSubParameters = datavalue.filter((it: any) => it._id != subId)
    // this.selectedSubParaids = this.selectedSubParaids.filter((it: any) => it != subId)



  }

  onGetSubParaList(ids: any): void {



    let data = {
      parameterId: ids,
      familyId:this.orderObj.params.familyId
    }
    this.service.postApiWithAuth("user/subParametersWithStatusFamilyEdit", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)

        let datavalue = success.data

        // datavalue = datavalue.map((it: any) => {

        //   let index = this.selectedSubParaids.indexOf(it._id)

        //   it.isSelected = index == -1 ? false : true

        //   return it
        // })


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

    let selectedParams = this.subParameterListBackup.filter((it: any) => it.isSelected)

    let arrayVale = []

    for (let index = 0; index < selectedParams.length; index++) {
      // const element = array[index];

      arrayVale.push(selectedParams[index]._id)

    }

    let selectedParamsIds=arrayVale.toString()
    this.selectedSubParaids = selectedParamsIds
    // console.log(selectedParams)
    // console.log(selectedParamsIds)
    // this.selectedSubParameters = selectedParams
    // $('#MedicationModal').modal('hide')
    this.onSaveSelectedParameter()


  }

  onSaveSelectedParameter() {
    let data = {
      parameterId: this.selectedPara['_id'],
      familyId:this.orderObj.params.familyId,
      selectedSubParameters: this.selectedSubParaids
    }
    this.service.postApiWithAuth("user/familyUpdateParametersEdit", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.selectedPara = null
        this.selectedSubParaids = []
        $('#MedicationModal').modal('hide')
        this.onGetParaList(this.orderObj.params.familyId)
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onNextValue() {
    let data = {
      completeStep: 4
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

  ngOnDestroy() {
    $('#MedicationModal').modal('hide')
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

}

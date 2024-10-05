import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any; 

declare function AcuteBox(): any;
declare function AddSymptoms(): any;  

@Component({
  selector: 'app-checkin-symptoms',
  templateUrl: './checkin-symptoms.component.html',
  styleUrls: ['./checkin-symptoms.component.css']
})
export class CheckinSymptomsComponent implements OnInit {
  parameterList: any = []
  subParameterList: any = []
  subParameterListBackup: any = []
  selectedPara: any
  selectedSubParaids: any
  formGroup: FormGroup
  symptomList: any = []
  symptomListBackup: any = []
  Gender = false
  selectedSymptomps: any = []
  selectedIndex:any = -1
  open:any=false
  discomfort:any=''
  ids=[]
  selectedBody=[]

  maleF:any=[]
  maleB:any=[]

  femaleF:any=[]
  femaleB:any=[]
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      reason: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.onAddSympyom()
    let userData = this.appProvider.current.loginData
    if (userData.gender == 'Male') {
      this.Gender = true
    } else {
      this.Gender = false
    }
    let object = this.appProvider.current.checkinAppointment ? this.appProvider.current.checkinAppointment : {}

    let object2 = this.appProvider.current.frontBody ? this.appProvider.current.frontBody : {}

    let object3 = this.appProvider.current.backBody ? this.appProvider.current.backBody : {}

    // let selectedBody = object.selectedBody

   
    let selectedBody = object.selectedBody?object.selectedBody:[]


    this.ids=object.ids?object.ids:[]

    this.selectedSymptomps=object.selectedSymp?object.selectedSymp:[]

    this.formGroup.patchValue({
      reason: object.reason,
    });
    for (let index = 0; index < selectedBody.length; index++) {
      const element = selectedBody[index];
      this.discomfort=this.discomfort+element.subbody
      if(index== selectedBody.length-1){

      }else{
        this.discomfort=this.discomfort+','
      }
      
    }
    let frontBody = selectedBody.filter((it: any) => it.type == 'Front')
    let backBody = selectedBody.filter((it: any) => it.type == 'Back')
    // console.log(frontBody,backBody)

    // console.log(object2,object3)

    if (frontBody.length > 0) {
      for (let index = 0; index < frontBody.length; index++) {
        const element = frontBody[index];

        if(element.gender=='Male'){

          let index=this.maleF.map((it:any)=>{return it}).indexOf(element.subbody)

          if(index==-1){
            this.maleF.push(element.subbody)
          }
         
        }else{
          let index=this.femaleF.map((it:any)=>{return it}).indexOf(element.subbody)

          if(index==-1){
            this.femaleF.push(element.subbody)
          }
          
        }

        let objectFront = object2.filter((it: any) => it.name == element.mainboy)
        if (objectFront.length > 0) {
          let subBodyParts = objectFront[0].subBodyParts
          let subBodyPartsData = subBodyParts.filter((it: any) => it.name == element.subbody)
          console.log(subBodyPartsData)
          if (subBodyPartsData.length > 0) {
            let subBodyPartsDataObject = subBodyPartsData[0]
            console.log(subBodyPartsDataObject)
            for (let index = 0; index < subBodyPartsDataObject.symptoms.length; index++) {
              const elementt = subBodyPartsDataObject.symptoms[index];
              this.symptomList.push({
                symptoms: elementt.name,
                bodyParts: subBodyPartsDataObject.name,
                mainBodyParts: element.mainboy,
                type: 'Front'
              })
            }
          }
        }
      }
    }

    if (backBody.length > 0) {
      for (let index = 0; index < backBody.length; index++) {
        const element = backBody[index];

        if(element.gender=='Male'){

          let index=this.maleB.map((it:any)=>{return it}).indexOf(element.subbody)

          if(index==-1){
            this.maleB.push(element.subbody)
          }
         
        }else{
          let index=this.femaleB.map((it:any)=>{return it}).indexOf(element.subbody)

          if(index==-1){
            this.femaleB.push(element.subbody)
          }
          
        }

        let objectFront = object3.filter((it: any) => it.name == element.mainboy)
        if (objectFront.length > 0) {
          let subBodyParts = objectFront[0].subBodyParts
          let subBodyPartsData = subBodyParts.filter((it: any) => it.name == element.subbody)
          console.log(subBodyPartsData)
          if (subBodyPartsData.length > 0) {
            let subBodyPartsDataObject = subBodyPartsData[0]
            console.log(subBodyPartsDataObject)
            for (let index = 0; index < subBodyPartsDataObject.symptoms.length; index++) {
              const elementt = subBodyPartsDataObject.symptoms[index];
              this.symptomList.push({
                symptoms: elementt.name,
                bodyParts: subBodyPartsDataObject.name,
                mainBodyParts: element.mainboy,
                type: 'Back'
              })
            }
          }
        }
      }
    }
    console.log(this.symptomList)

    // this.onAddSympyom()
    this.symptomListBackup = Object.assign([], this.symptomList)
    this.formGroup.patchValue({
      reason: object.reason
    });
    // AcuteBox()

  }

  onAddSympyom() {
    this.selectedSymptomps.push(
      {
        symptoms: '',
        bodyParts: '',
        mainBodyParts: '',
        type: '',
        severity:null
      }
    )
  }
  onSelectIndex(index:any){
    if(!this.open){
      this.selectedIndex=index
      this.open=true
    }
      
      
       
    }
  onSelectSymptom(i:any,obje:any){
    this.selectedSymptomps[i].symptoms=obje.symptoms
    this.selectedSymptomps[i].bodyParts=obje.bodyParts
    this.selectedSymptomps[i].mainBodyParts=obje.mainBodyParts
    this.selectedSymptomps[i].type=obje.type
    this.selectedIndex=-1
    setTimeout( ()=> {
      console.log('hide');
      this.open=false // here... this has different context
   }, 1000);
  }

  onSeveritySymptom(i:any,severity:any){
    this.selectedSymptomps[i].severity=severity
  }
  getSymptomList(){
    return this.symptomList
  }

  onDiscomfort(){
    let object = this.appProvider.current.checkinAppointment ? this.appProvider.current.checkinAppointment : {}
    for (let index = 0; index < this.selectedSymptomps.length; index++) {
      const element = this.selectedSymptomps[index];

      // if(!element.severity ||!element.symptoms ){
      //   this.service.err('Please select all symptoms and severity')
      //   return
      // }
      
    }
    console.log(this.formGroup.value)
    let obj = {
      reason: this.formGroup.value.reason,
      selectedSymp:this.selectedSymptomps,
      discomfort:this.discomfort
    }

    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthppcheck', JSON.stringify(newObject));
    this.appProvider.current.checkinAppointment = newObject

    this.route.navigate(['/chekin-avatar'])
  }
  onNextData() {
    let object = this.appProvider.current.checkinAppointment ? this.appProvider.current.checkinAppointment : {}



    for (let index = 0; index < this.selectedSymptomps.length; index++) {
      const element = this.selectedSymptomps[index];

      if(!element.severity ||!element.symptoms ){
        this.service.err('Please select all symptoms and severity')
        return
      }
      
    }
    console.log(this.formGroup.value)
    let obj = {
      reason: this.formGroup.value.reason,
      selectedSymp:this.selectedSymptomps,
      discomfort:this.discomfort
    }

    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthppcheck', JSON.stringify(newObject));
    this.appProvider.current.checkinAppointment = newObject


    let data = {
      checkinId: this.appProvider.current.currentChecking._id ,
      selectedSymp: this.selectedSymptomps,
    }
    this.service.postApiWithAuth("user/updateCheckinSymptoms", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.route.navigate(['/chekin-doctor'])
       
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
   

   
  }


  getClass(id: any,side?:any) {
 
    let indexData = this.ids.filter((it: any) => {
      // //console.log(it)

      // { 
      //   id:'mouth',
      //   gender:'Male',
      //   side:'front'
      // },
      if (this.Gender) {
       

          if (it.gender == 'Male' && it.side == side && it.id == id) {
            return it
          }

         else {
          if (it.gender == 'Male' && it.side == side && it.id == id) {
            return it
          }
        }

      } else {
      
          if (it.gender == 'Female' && it.side == side && it.id == id) {
            return it
          }

         else {
          if (it.gender == 'Female' && it.side == side && it.id == id) {
            return it
          }
        }
      }
      // return it
    })



    // //console.log(indexData)
    if (indexData.length == 0) {
      return ''
    } else {
      return 'active'
    }


  }

  onPathClick(mainboy: any, subbody: any, id: any) {
    

  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any; 

declare function AcuteBox(): any;

@Component({
  selector: 'app-appointment-book-reason',
  templateUrl: './appointment-book-reason.component.html',
  styleUrls: ['./appointment-book-reason.component.css']
})
export class AppointmentBookReasonComponent implements OnInit {
  parameterList: any = []
  subParameterList: any = []
  subParameterListBackup: any = []
  selectedPara: any
  selectedSubParaids: any
  formGroup: FormGroup
  formGroup1: FormGroup
  symptomList: any = []
  symptomListBackup: any = []

  selectedSymptomps: any = []

  selectedIndex:any = -1
  open:any=false
  discomfort:any=''
  filepath:any=''
  submitted = false
  formInvalid = false
  Gender = true
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

    this.formGroup1 = this.fb.group({
      fileSource: ['', [Validators.required]]

    })
  }
  ngOnInit(): void {

    let userData = this.appProvider.current.loginData
    if (userData.gender == 'Male') {
      this.Gender = true
    } else {
      this.Gender = false
    }
    // this.Gender = false
    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}

    this.selectedSymptomps=object.selectedSymp?object.selectedSymp:[]
    if(this.selectedSymptomps.length==0){
      this.onAddSympyom()
    }
    console.log(object)
    let object2 = this.appProvider.current.frontBody ? this.appProvider.current.frontBody : {}

    let object3 = this.appProvider.current.backBody ? this.appProvider.current.backBody : {}

    let selectedBody = object.selectedBody?object.selectedBody:[]


    this.ids=object.ids?object.ids:[]
    if(object.image && object.image.length>0){
      this.filepath= object.image[0]
    }

   
      this.formGroup.patchValue({
        reason: object.reason
      })
    
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

    if (frontBody.length > 0) {
      for (let index = 0; index < frontBody.length; index++) {
        const element = frontBody[index];

        console.log(element)
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
          this.maleB.push(element.subbody)
        }else{
          this.femaleB.push(element.subbody)
        }

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

    
    this.symptomListBackup = Object.assign([], this.symptomList)
    this.formGroup.patchValue({
      reason: object.reason
    });
    // AcuteBox()

  }

  onSelectIndex(index:any){
  if(!this.open){
    this.selectedIndex=index
    this.open=true
  }
    
    
     
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

  onSelectSymptom(i:any,obje:any){
    this.selectedIndex = -1
    this.selectedSymptomps[i].symptoms=obje.symptoms
    this.selectedSymptomps[i].bodyParts=obje.bodyParts
    this.selectedSymptomps[i].mainBodyParts=obje.mainBodyParts
    this.selectedSymptomps[i].type=obje.type
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
  onNextData() {

    if (!this.formGroup.valid) {
      this.formInvalid = true
      return

    }

    if(this.selectedSymptomps.length==0){
      this.service.err('Please select  atleast one symptom')
      return
    }
    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}

    for (let index = 0; index < this.selectedSymptomps.length; index++) {
      const element = this.selectedSymptomps[index];
     
      if(!element.severity ||!element.symptoms ){
        this.service.err('Please select all symptoms and severity')
        return
      }
      
    }

    
    console.log(this.formGroup.value)
    let obj:any = {
      reason: this.formGroup.value.reason,
      selectedSymp:this.selectedSymptomps,
      discomfort:this.discomfort,
      maleF:this.maleF,
      maleB:this.maleB,
      femaleF:this.femaleF,
      femaleB:this.femaleB
    }

    if(this.filepath){
      obj.image=[this.filepath]
    }

    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthAppLog', JSON.stringify(newObject));
    this.appProvider.current.currentAppointment = newObject
    this.route.navigate(['/appointment-book-vitals'])
  }

  onDiscomfort(){
    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}

    // for (let index = 0; index < this.selectedSymptomps.length; index++) {
    //   const element = this.selectedSymptomps[index];
     
    //   if(!element.severity ||!element.symptoms ){
    //     this.service.err('Please select all symptoms and severity')
    //     return
    //   }
      
    // }

    
    console.log(this.formGroup.value)
    let obj:any = {
      reason: this.formGroup.value.reason,
      // selectedSymp:this.selectedSymptomps,
      // discomfort:this.discomfort
    }

    if(this.filepath){
      obj.image=[this.filepath]
    }

    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthAppLog', JSON.stringify(newObject));
    this.appProvider.current.currentAppointment = newObject
    this.route.navigate(['/appointment-avatar'])
  }
  onRemoveImage(){
    this.filepath=''
    this.formGroup1.reset()
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.filepath=''
      this.formGroup1.patchValue({
        fileSource: file
      });
      this.submit()
    }

  }

  submit(){

    console.log(this.formGroup1.value.fileSource)
    const formData = new FormData();
    formData.append('file', this.formGroup1.value.fileSource);
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

  onPathClick(mainboy: any, subbody: any, id: any) {
    

  }

  // getClassActive(name:any, type?:any){
  //   let calssObject=Object.assign(this.selectedBody)
  //   // let type=this.Gender ? (this.MaleAvater ? 'Front' : 'Back') : (this.FemaleAvater ? 'Front' : 'Back')
    
 
  //   let datavalue=calssObject.filter((it:any)=>{
  //     if(it.subbody==name && it.type==type){
  //     return it
  //     }
  //   })
 
  //   console.log(datavalue)
  //   if(datavalue.length>0){
  //    return 'active'
  //   }else{
  //     return ''
  //   }
  //  //  this.selectedBody.push({
  //  //   mainboy: mainboy,
  //  //   subbody: subbody,
  //  //   id: id,
  //  //   gender:this.Gender ?'Male':'Female',
  //  //   type: this.Gender ? (this.MaleAvater ? 'Front' : 'Back') : (this.FemaleAvater ? 'Front' : 'Back')
  //  // })
  //  }
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'

import * as moment from 'moment';
declare var $:any
@Component({
  selector: 'app-coach-personal-details',
  templateUrl: './coach-personal-details.component.html',
  styleUrls: ['./coach-personal-details.component.css']
})
export class CoachPersonalDetailsComponent implements OnInit {
  
  orderObj: any = {}
  groupId: any = ''
  userId = ''
  hrxDrxDetails: any=''
  userDetails: any=''

  Gender = true
  ids=[]
  selectedBody=[]

  maleF:any=[]
  maleB:any=[]

  femaleF:any=[]
  femaleB:any=[]

  groupDetails:any

  pendingTaskList:any=[]
  completedTaskList:any=[]

  selectedIds:any=[]



  myDateValue: Date;
  formGroup: FormGroup
  submitted:boolean=false
  formInvalid:boolean=false
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

  
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]],
      dueDate: ['', [Validators.required]]

    })
    this.activeRoute.queryParamMap
    .subscribe((params: any) => {
      console.log(params)
      console.log({ groupId: params['groupId'] })

      this.orderObj = { ...params };
      console.log(this.orderObj.params.groupId)
      if (this.orderObj.params.userId && this.orderObj.params.groupId ) {
        this.groupId = this.orderObj.params.groupId
        this.userId = this.orderObj.params.userId
        this.onHistory(this.groupId,this.userId )
        this.getUserDetails(this.groupId,this.userId )
        this.getGroupDetails(this.groupId,this.userId )
        this.onGetTask()
      }

    }
    );
  }

  ngOnInit(): void {
    this.myDateValue = new Date();
  }

 

  onHistory(groupId: any, userId:any) {

    let data = {
      userId: userId,
      groupId:groupId
    }
    
    this.service.postApiWithAuth("user/getUserHrxDrxHistory", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.hrxDrxDetails = success.data 
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


  getUserDetails(groupId: any, userId:any) {

    let data = {
      userId: userId,
      groupId:groupId
    }
    
    this.service.postApiWithAuth("user/friendsDetailsWithLastAppointment", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.userDetails = success.data 
        this.femaleB=success.data && success.data.lastAppointment.length?success.data.lastAppointment[0].femaleB:[]
        this.femaleF=success.data && success.data.lastAppointment.length ?success.data.lastAppointment[0].femaleF:[]
        this.maleB=success.data && success.data.lastAppointment.length ?success.data.lastAppointment[0].maleB:[]
        this.maleF=success.data && success.data.lastAppointment.length ?success.data.lastAppointment[0].maleF:[]
        this.ids=success.data && success.data.lastAppointment.length ?success.data.lastAppointment[0].ids:[]
        console.log(this.userDetails)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


  getGroupDetails(groupId: any, userId:any) {

    let data = {
      userId: userId,
      groupId:groupId
    }
    
    this.service.postApiWithAuth("user/groupDetails", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.groupDetails = success.data 
      
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  getTime(time: any) {

    return moment(time).format('YYYY-MM-DD')
  }

  getAmPm(time: any){
    return moment(time).format('LT');
  }
  getFileName(url:any){
    if(url){
      let name=url.split('/').pop()
      return name
    }else{
      return ''
    }
  

  }
  onOpen(url:any) {
    window.open(url)
  }

  onDaonloadAll(files:any){

    // console.log(files)
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      window.open(element.ecg)
      
    }

  }

  getAge(time: any) {

    var ageDifMs = Date.now() - new Date(time).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
    return moment(time).fromNow()
  }


  getIds(index:any){
    return '#collapseFour'+index
  }

  onPathClick(mainboy: any, subbody: any, id: any) {
    

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

  onSave(){
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }

    else {
      let data = {
        title: this.formGroup.value.title,
        dueDate: this.formGroup.value.dueDate,
        forUser:this.userId 
      }
      this.service.postApiWithAuth("user/createTaks", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          if(success.data){

            $("#task").modal("hide")
            this.formGroup.reset()
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

  onGetTask(){
    let data = {
      forUser: this.userId
    }
    
    this.service.postApiWithAuth("user/getTask", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.pendingTaskList=success.data.filter((it:any)=>it.status=='Pending')
        this.completedTaskList=success.data.filter((it:any)=>it.status!='Pending')
        console.log(this.pendingTaskList)
        console.log(this.completedTaskList)

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  getStatus(id:any){
    
    let indexvalue=this.selectedIds.indexOf(id)
    if(indexvalue>-1){
      return true

    }
    return false
  }

  eventCheck(id:any){
    let indexvalue=this.selectedIds.indexOf(id)
    if(indexvalue>-1){
      let idsvalue=this.selectedIds.filter((it:any)=>it!=id)
      this.selectedIds=idsvalue
      return
    }
    this.selectedIds.push(id)
  
  }

  getDataValue(date:any){
   return   moment(date).fromNow()
  }

  onSaveTask(){
    console.log(this.selectedIds)
    let data = {
      selectedIds: this.selectedIds
    }
    
    this.service.postApiWithAuth("user/updateTask", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
       this.onGetTask()

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


}

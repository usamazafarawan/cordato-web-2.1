import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
@Component({
  selector: 'app-switch-user',
  templateUrl: './switch-user.component.html',
  styleUrls: ['./switch-user.component.css']
})
export class SwitchUserComponent implements OnInit {
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

  myRequest:any=[]
  whoCanAccessMyDashbord:any=[]

  myFriendList:any=[]

  selectedId:any=[]
  selectedUser:any=[]
  loginData=this.appProvider.current.loginData
  flag:any=1

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
    })

  }

  ngOnInit(): void {
    console.log(this.appProvider.current.loginData)
    this.omMyFriendList()
  }

  onSelect(item:any){
   let ids=this.selectedId.indexOf(item._id)


   let frind=this.selectedUser.indexOf(item._id)

   console.log(ids)
   if(ids==-1){
    this.selectedId.push(item._id)
   }else{
     let selectedId=this.selectedId.filter((it:any)=>it!=item._id)
     this.selectedId=selectedId

   }

   if(frind==-1){
    this.selectedUser.push(item.friendDetails._id)
   }else{
     let selectedUser=this.selectedId.filter((it:any)=>it!=item._id)
     this.selectedUser=selectedUser

   }


  }

  onGetSelected(id:any){
    // let ids=this.selectedId.indexOf(id)

    // if(ids==-1){
    //  return false
    // }else{
    //   return true
 
    // }
  }
  onDeleteMulti(){

    let data={
      requestIds:this.selectedId
    }
    this.service.postApiWithAuth("user/deleteFriend",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)

        this.omMyFriendList()
        this.selectedId=[]
        // this.myFriendList = success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        // this.myFriendList=[]
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onDeleteSingle(id:any){

    let data={
      requestIds:[id]
    }
    this.service.postApiWithAuth("user/deleteFriend",data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.service.succ("Request removed successfully")
        this.omMyFriendList()
        this.onWhoCanAccessMyDashbord()
        this.selectedId=[]
       
      }
      else {
        // this.myFriendList=[]
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
  omMyFriendList(){
    this.flag=1
    this.service.getApiWithAuth("user/myFriendList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.myFriendList = success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.myFriendList=[]
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


  onMyRequests(){
    this.service.getApiWithAuth("user/pendingReqToAccMyDash").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.myRequest = success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.myRequest=[]
        // this.service.err("You don't have any pending request")
      }
    }, error => {
      console.log({ error })
    })
  }

  onWhoCanAccessMyDashbord(){
    this.service.getApiWithAuth("user/whoCanSeeMyDashboardList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.whoCanAccessMyDashbord = success.data
        // this.service.succ(success.message)
        // console.log(this.slotList)
      }
      else {
        this.myRequest=[]
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
  onSave(){
    this.submitted = true
    console.log(this.formGroup.value)
    console.log(this.formGroup.invalid)
    if (this.formGroup.invalid) {
      this.formInvalid = true
      return
    }else if(this.loginData.email==this.formGroup.value.email){
      this.service.err("You can't invite yourself")
    }
    else {
      let data = {
        email: this.formGroup.value.email,
       
      }
      this.service.postApiWithAuth("user/requestToAccessDashboard", data, 1).subscribe(success => {
        if (success.status == 200) {
          console.log(success)
          this.service.succ(success.message)
          this.formGroup.reset()
         
        }
        else {
          this.service.err(success.message)
        }
      }, error => {
        console.log({ error })
      })
    }
  }

  onUpdateRequest(item:any, status:any){
    let data = {
      requestId: item._id,
      status:status
     
    }
    this.service.postApiWithAuth("user/updateReqDasbBoradAcc", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.service.succ("Request updated succcessfully")
        this.onMyRequests()
       
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onflag(flag:any){
    this.flag=flag
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  appointmetmentList:any={}
  formGroup: FormGroup 
  public EmojiFirst = false
  public EmojiSecond = false
  public EmojiThierd = false
  public EmojiFouth = false
  public EmojiFive = true


  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { 
    this.formGroup = this.fb.group({
      answer: ['great', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.onGetAppointment()
    this.appProvider.current.checkinAppointment={}
    this.EmojiFirst=false
  }

  Emoji(e: any) {
    console.log(e.target.value);
    if(e.target.value=='awful'){
      this.EmojiFirst=true
      this.EmojiSecond=false
      this.EmojiThierd=false
      this.EmojiFouth=false
      this.EmojiFive=false
    }
    if(e.target.value=='bad'){
      this.EmojiSecond=true
      this.EmojiFirst=false
      this.EmojiThierd=false
      this.EmojiFouth=false
      this.EmojiFive=false
    }
    if(e.target.value=='ok'){
      this.EmojiThierd=true
      this.EmojiFirst=false
      this.EmojiSecond=false
      this.EmojiFouth=false
      this.EmojiFive=false
    }
    if(e.target.value=='good'){
      this.EmojiFouth=true
      this.EmojiFirst=false
      this.EmojiSecond=false
      this.EmojiThierd=false
      this.EmojiFive=false
    }
    if(e.target.value=='great'){
      this.EmojiFive=true
      this.EmojiFirst=false
      this.EmojiSecond=false
      this.EmojiFouth=false
      this.EmojiFouth=false
    }
  }

  onGetAppointment(){
    this.service.getApiWithAuth("user/getChekingQuestion").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.appointmetmentList = success.data
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

  getTime(time:any){
    return moment(time).format('YYYY-MM-DD')
  }

  onOpen(link:any){
    window.open(link)
  }

  onSave(){
    if(!this.appointmetmentList._id ){
      this.service.err("No any checkin question found")
      return
    }
    let data = {
      questionId: this.appointmetmentList._id ,
      answer: this.formGroup.value.answer,
    }
    this.service.postApiWithAuth("user/userCheckin", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        if(this.formGroup.value.answer=='awful' || this.formGroup.value.answer=='bad' ){
          this.appProvider.current.currentChecking=success.data
          localStorage.setItem('healthchecking', JSON.stringify(success.data));
          this.route.navigate(['/chekin-bothering'])
        }else{}
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onSaveStatus(status:any){
    let data = {
      appId: this.appointmetmentList.lastComplete._id ,
      status: status
    }
    this.service.postApiWithAuth("user/markAppointmentRecoverstatus", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
       
        this.onGetAppointment()
       
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
}

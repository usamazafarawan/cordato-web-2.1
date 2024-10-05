import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-checkin-new',
  templateUrl: './checkin-new.component.html',
  styleUrls: ['./checkin-new.component.css']
})
export class CheckinNewComponent implements OnInit {

  // formGroup: FormGroup 
  public EmojiFirst = false
  public EmojiSecond = false
  public EmojiThierd = false
  public EmojiFouth = false
  public EmojiFive = true
  // EmojiValue: any = 'great'

  EmojiGroup: FormGroup 

  userData: any = []
  questionList: any = []
  questionValue: any
  symptomsValue: any
  severityValue: any

  checkinOption: Boolean = false
  tostarMsg: Boolean = false

  appointmetmentList:any

  symptomsList = [
    { name: "Lack of Sleep" },
    { name: "Sleeping Too Much" },
    { name: "Angry" },
    { name: "Sad" },
    { name: "Depressed" },
    { name: "Anxious" },
    { name: "Loss of Appetite" },
    { name: "Low Engergy Levels" },
  ]


  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.EmojiGroup = this.fb.group({
      answer: ['great', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.onGetUserData()
    this.onGetQuestion()
    // this.EmojiValue = this.EmojiValue.split(',')
    this.EmojiFirst=false
  }

  Emoji(e: any) { 
    if (e.target.value == 'awful') {
      this.EmojiFirst = true
      this.EmojiSecond = false
      this.EmojiThierd = false
      this.EmojiFouth = false
      this.EmojiFive = false
    }
    if (e.target.value == 'bad') {
      this.EmojiSecond = true
      this.EmojiFirst = false
      this.EmojiThierd = false
      this.EmojiFouth = false
      this.EmojiFive = false
    }
    if (e.target.value == 'ok') {
      this.EmojiThierd = true
      this.EmojiFirst = false
      this.EmojiSecond = false
      this.EmojiFouth = false
      this.EmojiFive = false
    }
    if (e.target.value == 'good') {
      this.EmojiFouth = true
      this.EmojiFirst = false
      this.EmojiSecond = false
      this.EmojiThierd = false
      this.EmojiFive = false
    }
    if (e.target.value == 'great') {
      this.EmojiFive = true
      this.EmojiFirst = false
      this.EmojiSecond = false
      this.EmojiFouth = false
      this.EmojiFouth = false
    }
  }

  onGetQuestion(){
    this.service.getApiWithAuth("user/getChekingQuestion").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.appointmetmentList = success.data 
        console.log("Question List",this.appointmetmentList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onGetUserData(): void {
    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) {
        this.userData = success.data  
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  CheckinHealth(){
    if(this.EmojiGroup.value.answer){
      this.checkinOption = true
    } 
  }

  severityChange(e: any) {
    this.severityValue = e.target.value
    console.log("Data", this.severityValue)
  }
  
  checkinSubmit(){
    if(this.severityValue==undefined){
      this.service.err("Plaese Select the Level")
      return
    }
    let data = {
      questionId: this.appointmetmentList._id ,
      answer: this.EmojiGroup.value.answer,
      level : this.severityValue
    }
    console.log("Data",data)
   
    this.service.postApiWithAuth("user/userCheckin", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.route.navigate(['/chekin-avatar'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
 




















  // checkinBack() {
  //   this.checkinOption = false
  //   this.EmojiValue = 'great,5'
  //   this.EmojiValue = this.EmojiValue.split(',')
  // }

  getQuestionList() {
    let data = {
      userId: this.userData._id
    }
    this.service.postApiWithAuth("user/checkInQuestionList", data, 1).subscribe(success => {
      if (success.status == 200) {
        this.questionList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  questionChange(e: any) {
    this.questionValue = e.target.value
    console.log("Data", this.questionValue)
    $(".CheckinNewSymptoms input").attr('checked', false);
    $(".CheckinNewSymptoms input").prop('checked', false);
    this.symptomsValue = ''
  }

  symptomsChange(e: any) {
    if (this.questionValue) {
      this.symptomsValue = e.target.value
      console.log("Data", this.symptomsValue)
    } else {
      this.tostarMsg = true
      setTimeout(() => {
        this.tostarMsg = false;
      }, 2000);
    }
  }

  // severityChange(e: any) {
  //   this.severityValue = e.target.value
  //   console.log("Data", this.severityValue)
  // }

  // checkinSubmit() {
  //   let data = {
  //     adddedBy: this.userData._id,
  //     symptoms: this.symptomsValue,
  //     severity: this.severityValue,
  //     // overAllHealth: this.EmojiValue[1],
  //     option: this.questionValue
  //   }
  //   console.log("Data::::", data);
  //   this.service.postApiWithAuth("user/saveCheckInsData", data, 1).subscribe({
  //     next: (success: any) => {
  //       if (success.status == 200) { 
  //         this.route.navigate(['chekin-avatar']) 
  //       }
  //       else {
  //         this.service.err(success.message)
  //       }
  //     },
  //     error: (error: any) => {
  //       console.log({ error })
  //     }
  //   })
  // }





} 

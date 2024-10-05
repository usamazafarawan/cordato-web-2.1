import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
declare function DaySelect(): any;
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-book-date',
  templateUrl: './appointment-book-date.component.html',
  styleUrls: ['./appointment-book-date.component.css']
})
export class AppointmentBookDateComponent implements OnInit {
  
  calendarOptions: CalendarOptions = {}
  todayDate: any
  slotList: any = []
  selectedSlot: any = ''
  selectDate: any = ''
  appointmentDetails: any = ''
  constructor(private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {

    DaySelect()
    
    let date = new Date()
    var newDate = new Date(date.setMonth(date.getMonth() + 2));
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      selectable: true,
      validRange: function (nowDate) {
        return { 
          start: new Date(),
          end: newDate
        };
      },
      editable: true,
      dateClick: (dateClickEvent) => { // <-- add the callback here as one of the properties of `options`
        console.log("DATE CLICKED !!!", dateClickEvent.dateStr);
        this.handleDateClick(dateClickEvent.dateStr);

      }
    };

  }
  handleDateClick(date: any): void {
    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}
    this.appointmentDetails = object
    console.log(object)
    this.selectedSlot = ''
    this.selectDate = date
    let data = {
      doctorId: object.doctorId,
      date: date,
    }
    this.service.postApiWithAuth("user/getSlotList", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        let currentTime=moment().format('LT');
        console.log(currentTime)

        let splitTime=currentTime.split(' ')
        let splitHoursMin=splitTime[0].split(':')
        let time=0

        if(splitTime[1]=='PM' && splitHoursMin[0]!='12'){
          time= 12*60+parseInt(splitHoursMin[0])*60+parseInt(splitHoursMin[1])
        }else{
          time= parseInt(splitHoursMin[0])*60+parseInt(splitHoursMin[1])
        }
        let currentDate=moment().format('YYYY-MM-DDD')
        let selectedDate=moment(date).format('YYYY-MM-DDD')

        if(currentDate==selectedDate){
          this.slotList = success.data.filter((it: any) => it.isAvailable && it.time>=time)
        }else{
          this.slotList = success.data.filter((it: any) => it.isAvailable)
        }
       
        // this.service.succ(success.message)
        console.log(this.slotList)
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  getDate() {

    return moment(this.selectDate).format('LL')
  }

  onContinue() {

    if (!this.selectedSlot) {
      this.service.err('Please select slot')
      return
    }

    // this.appointmentDetails = object
    console.log(this.appointmentDetails)
    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}
    let obj = {
       slotId:this.selectedSlot._id,
       date:this.selectDate
    }
  
    let newObject = Object.assign(object, obj)
    console.log(newObject)
    localStorage.setItem('healthAppLog', JSON.stringify(newObject));
    this.appProvider.current.currentAppointment = newObject
    $('#DetailsModal').modal('show')

  }
  onSelectSlot(item: any) {
    console.log(item)
    this.selectedSlot = item
  }

  onConfirm(){

    let object = this.appProvider.current.currentAppointment ? this.appProvider.current.currentAppointment : {}
    this.service.postApiWithAuth("user/createAppointment", object,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        let newObject=null
        localStorage.setItem('healthAppLog', JSON.stringify(newObject));
        this.appProvider.current.currentAppointment = newObject
        $('#DetailsModal').modal('hide')
        $('#Congratulation').modal('show')
        // this.doctorList=success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

}

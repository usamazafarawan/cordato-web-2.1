import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-past',
  templateUrl: './appointment-past.component.html',
  styleUrls: ['./appointment-past.component.css']
})
export class AppointmentPastComponent implements OnInit {
  appointmetmentList: any = []
  appointmetmentListBackup: any = []
  selectedApp: any = ''
  otpForm: FormGroup
  ratingForm: FormGroup
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

    this.ratingForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      recommendDoc: ['Yes', [Validators.required]],
      rating: ['3.5', [Validators.required]],
      review: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    this.onGetAppointment()

  }

  onShow(item: any) {
    this.selectedApp = item
    $("#PastDetailsModal").modal('show')
  }

  onGetAppointment() {
    this.service.getApiWithAuth("user/getAppointmentList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.appointmetmentList = success.data.past
        this.appointmetmentListBackup = success.data.past
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

  getTime(time: any) {

    if (time) {

      // console.log(time.split('T'))
      return time.split('T')[0]
    }

  }

  onOpen(link: any) {
    window.open(link)
  }
  onView(app: any) {
    this.selectedApp = app
    $('#DetailsModal').modal('show')
  }

  onSearch() {
    console.log(this.otpForm.value)


    let searchText = this.otpForm.value.searchText.trim().toLowerCase()

    let appValue = JSON.stringify(this.appointmetmentListBackup)
    let appValueData = JSON.parse(appValue)
    if (searchText) {
      console.log('search if')
      let app = Object.assign([], appValueData)

      let applist = app.filter((it: any) => {

        if (it) {
          let date = moment(it.date).format('YYYY-MM-DD')
          // let name=(it.).toLowerCase()
          let name = ''
          let department = ''
          if (it && it.doctorDetails) {
            name = (it.doctorDetails.firstName + ' ' + it.doctorDetails.lastName).toLowerCase()
            department = (it.doctorDetails.department).toLowerCase()
          }
          if ((name && name.includes(searchText)) || (department && department.includes(searchText) || (date && date.includes(searchText)))) {

            return it

          }
        }
      })
      this.appointmetmentList = applist
    } else {
      console.log('search else')
      console.log(this.appointmetmentListBackup)
      this.appointmetmentList = this.appointmetmentListBackup
    }
  }

  onSaveRating() {
    console.log(this.ratingForm.value)


    let data = {
      appointmentId: this.selectedApp._id,
      doctorId: this.selectedApp.doctorId,
      recommendDoc: this.ratingForm.value.recommendDoc,
      rating: this.ratingForm.value.rating,
      review: this.ratingForm.value.review
    }
    this.service.postApiWithAuth("user/createReviewRating", data,1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.service.succ('Review Submitted successfully')
        $('#RatingModal').modal('hide')
        this.ratingForm.reset()

        this.ratingForm.patchValue({
          recommendDoc:'Yes',
          rating:'3.5',

        })
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }
}
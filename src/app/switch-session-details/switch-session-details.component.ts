import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'

import * as moment from 'moment';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
declare var $: any;
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
 
declare function ActiveFunction(): any;

@Component({
  selector: 'app-switch-session-details',
  templateUrl: './switch-session-details.component.html',
  styleUrls: ['./switch-session-details.component.css']
})
export class SwitchSessionDetailsComponent implements OnInit {
  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  appointmetmentData: any = {}
  appointmetmentDataBackup: any = {}
  selectedApp: any = ''
  orderObj: any = {}
  ratingData: any = []
  groupId: any = ''
  parameterId = ''
  dataValue: any = {}
  forData = 'today'
  avgData = 0
  minimumData = 0
  maxData = 0
  staDaviationData = 0
  unit = ''
  today: any = []
  seriesData: any = []
  xaxisData: any = []
  dataValueForChart: any = []
  showChart = false
  userId:any
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Data",
          data: [100, 200, 270, 250, 150, 50, 175, 225, 235]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        }
      },
      title: {
        text: ""
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "oct", "Nov", "Dec"]
      },
    };
  }


  ngOnInit(): void {

    ActiveFunction()
    this.activeRoute.queryParamMap
    .subscribe((params:any) => {
      console.log(params)
      console.log({ groupId: params['groupId'] })

      this.orderObj = { ...params };
      console.log(this.orderObj.params.groupId)
      if (this.orderObj.params.parameterId) {
        this.groupId=this.orderObj.params.groupId
        this.userId=this.orderObj.params.userId
        this.parameterId=this.orderObj.params.parameterId
        this.onGetGroupDetails(this.orderObj.params.parameterId, this.userId)
      }

    }
    );

  }
  getTodaySchedule() {
    let slot = []
    let i = 0
    while (i < 1440) {
      let a = i

      let end = i + 30

      let b = i / 60
      let c = i % 60
      let d: any = Math.floor(b)
      let e
      let am = 'AM'

      let bb = end / 60
      let cc = end % 60
      let dd = Math.floor(bb)
      let ee
      let amam = 'AM'


      if (d < 12) {
        am = 'AM'
        e = d
      } else if (d == 12) {
        am = 'PM'
        e = 12
      } else {
        am = 'PM'
        e = d - 12
      }


      if (dd < 12) {
        amam = 'AM'
        ee = dd
      } else if (dd == 12) {
        amam = 'PM'
        ee = 12
      } else {
        amam = 'PM'
        ee = dd - 12
      }


      let startHours = e < 10 ? '0' + e : e
      let startMin: any = c < 10 ? '0' + c : c
      let startCombine = startHours + ':' + startMin + ' ' + am

      let endHours = ee < 10 ? '0' + ee : ee
      let endMin = cc < 10 ? '0' + cc : cc
      let endCombine = endHours + ':' + endMin + ' ' + amam

      // console.log({
      //     startCombine,endCombine
      // })

      slot.push({
        time: parseInt(d) * 60 + parseInt(startMin),
        startCombine: startCombine,
        endCombine: endCombine,
        status: 'Active'
      })
      i = i + 30
    }
    console.log(slot)
  }
  onSelectType(type: any) {
    this.forData = type
    this.onGetGroupDetails(this.parameterId, this.userId)
  }
  onGetGroupDetails(id: any, userId:any) {

    let data = {
      parameterId: id,
      forData: this.forData,
      userId:userId
    }
    this.showChart = false
    this.service.postApiWithAuth("user/getParametersDetailsGraph", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.appointmetmentData = success.data
        this.appointmetmentDataBackup = success.data
        if (this.appointmetmentData.length > 0) {
          this.dataValue = this.appointmetmentData[0]
        }

        let avgData = 0
        let minimumData = 0
        let maxData = 0
        let staDaviationData = 0
        let length = this.appointmetmentData.length
        let dataValueForChart: any = []
        let calculation='Sum'
        for (let index = 0; index < this.appointmetmentData.length; index++) {
          const element = this.appointmetmentData[index];
          calculation=this.appointmetmentData[0].parameters.calculation
          let timeMin = 0
          let splitTime = element.time.split(' ')

          if (splitTime.length > 1) {
            let hoursMin = splitTime[0].split(":")

            if (splitTime[1] == 'PM' && hoursMin[0] != '12') {
              timeMin = 12 * 60 + parseInt(hoursMin[0]) * 60 + parseInt(hoursMin[1])
            } else {
              timeMin = parseInt(hoursMin[0]) * 60 + parseInt(hoursMin[1])
            }

          }

          if (index == 0) {
            this.appointmetmentData[index].diff = 0
            minimumData = element.value
            maxData = element.value
            this.unit = element.unit
          } else {
            if (minimumData > element.value) {
              minimumData = element.value
            }

            if (maxData < element.value) {
              maxData = element.value
            }
            this.appointmetmentData[index].diff = this.appointmetmentData[index - 1].value - this.appointmetmentData[index].value

          }
          console.log(this.appointmetmentData[index].diff)
          avgData = avgData + element.value
          staDaviationData = staDaviationData + this.appointmetmentData[index].diff
          dataValueForChart.push({
            timeMin: timeMin,
            time: element.time,
            value: element.value,
            unit: element.unit,
            createdAt: element.createdAt
          })

        }

        this.dataValueForChart = dataValueForChart.sort((n1: any, n2: any) => { return n1.timeMin - n2.timeMin });
        // dataValueForChart.sort(function (a: any, b: any) { return a - b });
        // this.dataValueForChart = dataValueForChart
        this.avgData = avgData > 0 ? calculation=='Sum'?avgData:(avgData / length) : 0
        this.minimumData = minimumData
        this.maxData = maxData
        this.staDaviationData = staDaviationData > 0 ? calculation=='Sum'?staDaviationData:(staDaviationData / length) : 0
        console.log(this.dataValueForChart)

        this.xaxisData = []
        this.seriesData = []
        if (this.forData == 'today') {
          for (let index = 0; index < this.dataValueForChart.length; index++) {
            const element = this.dataValueForChart[index];

            this.seriesData.push(element.value)
            this.xaxisData.push(element.time)

          }
        }
        if (this.forData == 'week') {
          this.xaxisData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          this.seriesData = [0, 0, 0, 0, 0, 0, 0]
          for (let index = 0; index < this.dataValueForChart.length; index++) {
            const element = this.dataValueForChart[index];

            var d = new Date(element.createdAt);
            var n = d.getDay()
            let last = this.seriesData[n]
            if (last < element.value) {
              this.seriesData[n] = element.value
            }
            // this.seriesData.push(element.value)
            // this.xaxisData.push(element.time)

          }
        }
        if (this.forData == 'month') {
          this.xaxisData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          this.seriesData = [0, 0, 0, 0, 0, 0, 0]
          var date = new Date();
          let firstday = new Date(date.getFullYear(), date.getMonth(), 1);
          let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          var dates = [];

          var currDate = moment(firstday).startOf('day');
          var lastDate = moment(lastDay).startOf('day');

          while (currDate.diff(lastDate) <= 0) {
            console.log(currDate.toDate());
            dates.push(moment(currDate.clone().toDate()).format('YYYY-MM-DD'));
            this.seriesData.push(0)
            currDate = currDate.add(1, 'days')
          }
          this.xaxisData = dates

          console.log(dates)
          for (let index = 0; index < this.dataValueForChart.length; index++) {
            const element = this.dataValueForChart[index];

            var crrentDate = moment(element.createdAt).format('YYYY-MM-DD');
            let crrentDateIndex = dates.indexOf(crrentDate)


            let last = this.seriesData[crrentDateIndex]
            if (last < element.value) {
              this.seriesData[crrentDateIndex] = element.value
            }
          }
        }
        if (this.forData == 'year') {
          this.xaxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
          this.seriesData = [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0]
          for (let index = 0; index < this.dataValueForChart.length; index++) {
            const element = this.dataValueForChart[index];

            var d = new Date(element.createdAt);
            var n = d.getMonth()
            let last = this.seriesData[n]
            if (last < element.value) {
              this.seriesData[n] = element.value
            }
            // this.seriesData.push(element.value)
            // this.xaxisData.push(element.time)

          }
        }
        this.chartOptions.series[0].data = this.seriesData
        this.chartOptions.xaxis.categories = this.xaxisData
        this.showChart = true
        console.log(this.chartOptions)


      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';

import { ChartOptions, ChartType, ChartDataSets, ChartConfiguration } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';


@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.css']
})
export class DashboardGraphComponent implements OnInit {

  // Pulse Graph

  barChartLabelsPulseData: any = []

  barChartOptionsPulse: ChartOptions = { responsive: true, };
  barChartLabelsPulse: Label[] = ['', '', '', '', '', '', ''];
  barChartTypePulse: ChartType = 'line';
  barChartLegendPulse = false;
  barChartPluginsPulse = [];
  barChartDataPulse: ChartDataSets[] = [
    { data: [], label: 'Historical Data',borderWidth:1 }
  ];
  barChartColorsPulse: Color[] = [
    { backgroundColor: '#38474e', borderColor: '#448b7a', pointBackgroundColor: '#448b7a', },
  ]

  // Temperature Graph

  barChartOptionsTemperature: ChartOptions = { responsive: true, };
  barChartLabelsTemperature: Label[] = ['', '', '', '', '', '', ''];
  barChartTypeTemperature: ChartType = 'line';
  barChartLegendTemperature = false;
  barChartPluginsTemperature = [];
  barChartDataTemperature: ChartDataSets[] = [
    { data: [], label: 'Historical Data',borderWidth:1 }
  ];
  barChartDataSPO2:ChartDataSets[] = [    { data: [], label: 'Historical Data',borderWidth:1}]
  barChartColorsTemperature: Color[] = [
    { backgroundColor: '#38474e', borderColor: '#448b7a', pointBackgroundColor: '#448b7a', },
  ]

  // Respiration Rate Graph

  barChartLabelsRespirationData: any = []

  barChartOptionsRespiration: ChartOptions = { responsive: true, };
  barChartLabelsRespiration: Label[] = ['', '', '', '', '', '', ''];
  barChartTypeRespiration: ChartType = 'line';
  barChartLegendRespiration = false;
  barChartPluginsRespiration = [];
  barChartDataRespiration: ChartDataSets[] = [
    { data: [], label: 'Historical Data' ,borderWidth:1}
  ];
  barChartColorsRespiration: Color[] = [
    { backgroundColor: '#38474e', borderColor: '#448b7a', pointBackgroundColor: '#448b7a', },
  ]

  // Blood Pressure Graph

  barChartOptionsBlood: ChartOptions = { responsive: true,     scales: { xAxes: [{}], yAxes: [{}] }
};
  barChartLabelsBlood: Label[] = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  barChartTypeBlood: ChartType = 'line';
  barChartLegendBlood = false;
  barChartPluginsBlood = [];
  barChartDataBlood: ChartDataSets[] = [
    { data: [], label: 'Systolic' ,borderWidth:1},
    { data: [], label: 'Diastolic' ,borderWidth:1}
  ];
  barChartColorsBlood: Color[] = [
    { backgroundColor: '#38474e', borderColor: '#448b7a', pointBackgroundColor: '#448b7a', },
    { backgroundColor: '#1DA1F2', borderColor: '#367dd6', pointBackgroundColor: '#367dd6', },
  ]

  // Measurement Graph

  barChartOptionsMeasurement: ChartOptions = { responsive: true,   elements: {
    line: {
        borderWidth: 1, // Change this value as needed
    }
}};
  barChartLabelsMeasurement: Label[] = ['', '', '', '', ''];
  barChartTypeMeasurement: ChartType = 'line';
  barChartLegendMeasurement = false;
  barChartPluginsMeasurement = [];
  barChartDataMeasurement: ChartDataSets[] = [
    { data: [], label: 'Historical Data' }
  ];
  barChartColorsMeasurement: Color[] = [
    { backgroundColor: '#38474e', borderColor: '#448b7a', pointBackgroundColor: '#448b7a', },
    { backgroundColor: '#005bea' },
  ]

  overallHealthChart: ChartDataSets[] = [ {label:'asas'}];
  overallHealthChartLabels: Label[] = ['', '', '', '', '', '', '','','','',''];
  overallHealthChartOptions: ChartOptions = { responsive: true, };
  overallHealthChartColors: Color[] = []
  overallHealthChartPlugins = [];
  overallHealthChartLegend = true;
  overallHealthChartType: ChartType = 'line';
  // questions new chart start from here 
  barChartQuestions: ChartDataSets[] = [
    { data: [], label: 'Historical Data',borderWidth:1 }
  ];
  barChartLabelsQuestions: Label[] = ['', '', '', '', '', '', ''];
  barChartOptionsQuestions: ChartOptions = { 
    responsive: true, 
    scales: {
      yAxes: [{
        ticks: {
          min: 1,
        },
      }],
    }
  };
  barChartColorsQuestions: Color[] = [
    { backgroundColor: '#38474e', borderColor: '#448b7a', pointBackgroundColor: '#448b7a', },
  ]
  barChartPluginsQuestions = [];
  barChartLegendQuestions = false;
  barChartTypeQuestions: ChartType = 'line';
  barChartLegedsQuestions:any=[];

  // questions new chart end from here 

  userData: any = ''
  groupData: any = []
  // platform:any='android'

  id: any
  questionList: any = []
  checkinAnalysisList: any = []

  pulseGraphData: any
  temperatureGraphData: any
  respirationRateGraphData: any
  bloodPressureGraphData: any

  deviceBaseData: any

  platform: any

  public MeasurementShow: boolean = false;
  appointmentRelmemData: any = []

  parentMessage = "This is a message from parent"

  relmeGraphsyncValues: any

  levelCount:any=[];
  spo2Chart:any;


  emojiChartLabels:any[]=[]
  chartPlugins = [];
  chartOptions: ChartOptions = {
    responsive: true,
    title:{
display:true,
text: "Count",
position:'left',
fontColor:'#fff',
padding:1,
lineHeight:0.7,
fullWidth:false,
fontSize:10
    },
    scales: {
      scaleLabel:{
        display:true
      },
      yAxes: [{
        ticks: {
          min: 1,
          beginAtZero: true
        },
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white', // Set the font color of Y-axis labels to white
          fontSize: 8,

        },
      }],
    },
    legend: {
      display: false,
      position: 'bottom', // Position legend at the bottom
      labels: {
          fontSize: 10,
          fontColor:'#fff',
          boxWidth: 10, // Set the desired width of the legend rectangles
      }
  }
  };
  checkInAnalysisButton:any={
    day:'active',
    week:'',
    month:'',
    year:'',
  }
  selectedQuestion:any=null;
  selectedQuestionTime:any=[];
   dayData = [{"hour":"12 AM","value":0.0},{"hour":"2 AM","value":0.0},{"hour":"4 AM","value":0.0},{"hour":"6 AM","value":0.0},{"hour":"8 AM","value":0.0},{"hour":"10 AM","value":0.0},{"hour":"12 PM","value":0.0},{"hour":"2 PM","value":0.0},{"hour":"4 PM","value":0.0},{"hour":"6 PM","value":0.0},{"hour":"8 PM","value":0.0},{"hour":"10 PM","value":0.0}]
  weekData = [{"day":"Sun","value":0.0},{"day":"Mon","value":0.0},{"day":"Tue","value":0.0},{"day":"Wed","value":0.0},{"day":"Thu","value":0.0},{"day":"Fri","value":0.0},{"day":"Sat","value":0.0}]
  yearData = [{"month":"Jan","value":0.0},{"month":"Feb","value":0.0},{"month":"Mar","value":0.0},{"month":"Apr","value":0.0},{"month":"May","value":0.0},{"month":"Jun","value":0.0},{"month":"Jul","value":0.0},{"month":"Aug","value":0.0},{"month":"Sept","value":0.0},{"month":"Oct","value":0.0},{"month":"Nov","value":0.0},{"month":"Dec","value":0.0}]
monthData = [
  {"day":"1","value":0.0},
  {"day":"2","value":0.0},
  {"day":"3","value":0.0},
  {"day":"4","value":0.0},
  {"day":"5","value":0.0},
  {"day":"6","value":0.0},
  {"day":"7","value":0.0},
  {"day":"8","value":0.0},
  {"day":"9","value":0.0},
  {"day":"10","value":0.0},
  {"day":"11","value":0.0},
  {"day":"12","value":0.0},
  {"day":"13","value":0.0},
  {"day":"14","value":0.0},
  {"day":"15","value":0.0},
  {"day":"16","value":0.0},
  {"day":"17","value":0.0},
  {"day":"18","value":0.0},
  {"day":"19","value":0.0},
  {"day":"20","value":0.0},
  {"day":"21","value":0.0},
  {"day":"22","value":0.0},
  {"day":"23","value":0.0},
  {"day":"24","value":0.0},
  {"day":"25","value":0.0},
  {"day":"26","value":0.0},
  {"day":"27","value":0.0},
  {"day":"28","value":0.0},
  {"day":"29","value":0.0},
  {"day":"30","value":0.0},
  {"day":"31","value":0.0},
]
labelsInfo:any[]=[
  {
    value:'great',
    label:'Great',
    color:'#34C759',
    imgPath:'assets/images/Great 3.png',
    status:1,
},
{
  value:'good',
  label:'Good',
  color:'#5856D5',
  imgPath:'assets/images/Good 6.png',
  status:2,
},
{
  value:'ok',
  label:'OK',
  color:'#007AFF',
  imgPath:'assets/images/Okay 6.png',
  status:3,
},
{
  value:'alittleoff',
  label:'A little off',
  color:'#FFCC00',
  imgPath:'assets/images/LittleOff 3.png',
  status:4,
},
{
  value:'bad',
  label:'Bad',
  color:'#FF9500',
  imgPath:'assets/images/Bad 6.png',
  status:5,
},
{
  value:'awful',
  label:'Awful',
  color:'#FF3b30',
  imgPath:'assets/images/Horrible 7.png',
  status:6,
}
]
legendsEmoji:any[]=[];
min:number=0;
max:number=0;
average:number=0;
stdDeviation:number=0;
  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userData = this.appProvider.current.loginData
    this.onGetUserData()
    this.onCreatePaitentId()
    this.appointmentRelmData()
    this.getAllCheckinQuestions();
  }

  onGetUserData(): void {
    this.service.getApiWithAuth("user/getUserDetailsWithOtherData").subscribe(success => {
      if (success.status == 200) {
        this.userData = success.data
        localStorage.setItem('healthlogin', JSON.stringify(success.data));
        this.appProvider.current.loginData = success.data

        this.getCheckinQuestionList()
        // this.onGetAppointment() 

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  deviceSelect(e: any) {
    this.platform = e.target.value
    // console.log("this.platform", this.platform)
    this.service.getApiWithAuth("user/getGroup?platform=" + this.platform).subscribe(success => {
      if (success.status == 200) {
        this.deviceBaseData = success.data
        // console.log("deviceBaseData", this.deviceBaseData)

        this.onGetpulseGraph()
        this.onGettemperatureGraph()
        this.onGetrespirationRateGraph()
        this.onGetbloodPressureGraph()

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  openMeasurement() {
    this.MeasurementShow = !this.MeasurementShow;
  }

  deviceGroupId(data: any) {
    let object = {
      platform: this.platform,
      groupId: data._id,
      status: data.selectedGroup.isSelected ? 'Inactive' : 'Active'
    }
    this.service.postApiWithAuth("user/updateGroup", object, 1).subscribe(success => {
      console.log("success", success)
      if (success.status == 200) {
        this.appointmentRelmData()
      }
      else {
        this.service.err(success.message)
      }
      this.groupIdRefresh()
    }, error => {
      console.log({ error })
    })
  }

  groupIdRefresh() {
    if (this.appointmentRelmemData?.group?.platform) {
      this.platform = this.appointmentRelmemData?.group?.platform
    }
    this.service.getApiWithAuth("user/getGroup?platform=" + this.platform).subscribe(success => {
      if (success.status == 200) {
        this.deviceBaseData = success.data
        // console.log("deviceBaseData", this.deviceBaseData)

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  appointmentRelmData(): void {
    let data = {
      userId: this.userData._id,
      platform: this.platform,
      timeZone: 'America/Chicago'
    }
    // console.log("data11111",data)
    this.service.postApiWithAuth("user/getDashboardGroupDetailsWithRealm", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          this.appointmentRelmemData = success.data
          // console.log("Data success111", this.appointmentRelmemData)

          this.deviceOptionShow(this.appointmentRelmemData.group.platform)

          let relmemData = this.appointmentRelmemData.parameters
          for (var i = 0; i < relmemData?.length; i++) {
            let individualRelmeData = relmemData[i]
            for (var j = 0; j < individualRelmeData.graph?.length; j++) {
              individualRelmeData.graph.length = 5
              this.relmeGraphsyncValues = [];
              for (var k = 0; k < individualRelmeData.graph.length; k++) {
                var abc = {
                  "value": individualRelmeData.graph[k]?.syncValues,
                }
                this.relmeGraphsyncValues.push(abc.value)
              }
            }
            console.log("relmeGraphsyncValues",this.relmeGraphsyncValues)
            relmemData[i].graphData = this.relmeGraphsyncValues
            // this.barChartDataMeasurement[0].data = relmemData[i].graphData
          }
          console.log("relmemData",relmemData)

          const SPO2ChartIndex= relmemData.findIndex((chart:any)=>chart.parameters.name === 'Oxygen saturation')
          console.log('SPO2ChartIndex: ', SPO2ChartIndex);
          this.spo2Chart = relmemData[SPO2ChartIndex];
          this.barChartLabelsTemperature=[]
          this.barChartDataSPO2[0].data = this.spo2Chart.graph.map(
            (value: any) => {
              this.barChartLabelsTemperature.push('');
              return value.syncValues;
            }
          );
          console.log(' this.spo2Chart : ',  this.spo2Chart );
          relmemData.splice(SPO2ChartIndex,1);
          this.appointmentRelmemData.parameters = relmemData
          console.log('  this.appointmentRelmemData.parameters: ',   this.appointmentRelmemData.parameters);
          // console.log("Data success2222222", this.appointmentRelmemData)
          this.groupIdRefresh()
          this.onGetpulseGraph()
          this.onGettemperatureGraph()
          this.onGetrespirationRateGraph()
          this.onGetbloodPressureGraph()
        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  deviceOptionShow(e: any) {
    this.platform = e
    // console.log("this.platform", this.platform)
    this.service.getApiWithAuth("user/getGroup?platform=" + this.platform).subscribe(success => {
      if (success.status == 200) {
        this.deviceBaseData = success.data
        console.log("deviceBaseData", this.deviceBaseData)

        this.onGetpulseGraph()
        this.onGettemperatureGraph()
        this.onGetrespirationRateGraph()
        this.onGetbloodPressureGraph()

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onCreatePaitentId(): void {
    this.service.getApiWithAuth("user/createPaitentId").subscribe(success => {
      if (success.status == 200) {
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  // onGetAppointment(): void{
  //   let data = {
  //     userId: this.userData._id,
  //     platform: this.platform,
  //     timeZone: 'America/Chicago'
  //   }  
  //   console.log("onGetAppointment",data)
  //   this.service.postApiWithAuth("user/getDashboardGroupDetails", data, 1).subscribe({
  //     next: (success) => { 
  //       if (success.status == 200) {
  //         this.groupData = success.data 
  //         this.onGetpulseGraph()
  //         this.onGettemperatureGraph()
  //         this.onGetrespirationRateGraph()
  //         this.onGetbloodPressureGraph()
  //       }
  //       else {
  //         this.service.err(success.message)
  //       }
  //     },
  //     error: (error) => {
  //       console.log({ error })
  //     }
  //   })
  // }

  onGetpulseGraph(): void {
    let data = {
      userId: this.userData._id,
      platform: this.platform,
      timeZone: 'America/Chicago'
    }
    this.service.postApiWithAuth("user/pulseGraph", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          this.pulseGraphData = success.data

          // console.log("this.pulseGraphData", this.pulseGraphData)

          this.pulseGraphData.graph.length = 7
          let pulseGraphsyncValues = [];
          for (var i = 0; i < this.pulseGraphData.graph?.length; i++) {
            var abc = {
              "value": this.pulseGraphData.graph[i].syncValues,
            }
            pulseGraphsyncValues.push(abc.value)
          }
          this.barChartDataPulse[0].data = pulseGraphsyncValues
          


          let pulseGraphsyncTime = [];
          for (var i = 0; i < this.pulseGraphData.graph?.length; i++) {
            var abcd = {
              "time": this.pulseGraphData.graph[i].time,
            }
            pulseGraphsyncTime.push(abcd.time)
          }
          this.barChartLabelsPulseData = pulseGraphsyncTime
          // console.log("this.barChartLabelsPulseData", this.barChartLabelsPulseData)
        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  onGettemperatureGraph(): void {
    let data = {
      userId: this.userData._id,
      platform: this.platform,
      timeZone: 'America/Chicago'
    }
    this.service.postApiWithAuth("user/temperatureGraph", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          this.temperatureGraphData = success.data
          this.temperatureGraphData.graph.length = 20
          // console.log("Temperature Graph Data",this.temperatureGraphData)

          let temperatureGraphsyncValues = [];
          for (var i = 0; i < this.temperatureGraphData.graph.length; i++) {
            var abc = {
              "value": this.temperatureGraphData.graph[i]?.syncValues,
            }
            temperatureGraphsyncValues.push(abc.value)
          }
          this.barChartDataTemperature[0].data = temperatureGraphsyncValues
        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  onGetrespirationRateGraph(): void {
    let data = {
      userId: this.userData._id,
      platform: this.platform,
      timeZone: 'America/Chicago'
    }
    this.service.postApiWithAuth("user/respirationRateGraph", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          this.respirationRateGraphData = success.data
          this.respirationRateGraphData.graph.length = 7
          // console.log("Respiration Rate Graph Data",this.respirationRateGraphData)

          let respirationRateValue = [];
          for (var i = 0; i < this.respirationRateGraphData.graph.length; i++) {
            var abc = {
              "value": this.respirationRateGraphData.graph[i]?.syncValues,
            }
            respirationRateValue.push(abc.value)
          }
          this.barChartDataRespiration[0].data = respirationRateValue

          let pulseGraphsyncTime = [];
          for (var i = 0; i < this.respirationRateGraphData.graph.length; i++) {
            var abcd = {
              "time": this.respirationRateGraphData.graph[i].time,
            }
            pulseGraphsyncTime.push(abcd.time)
          }
          this.barChartLabelsRespirationData = pulseGraphsyncTime


        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  onGetbloodPressureGraph(): void {
    let data = {
      userId: this.userData._id,
      platform: this.platform,
      timeZone: 'America/Chicago'
    }
    this.service.postApiWithAuth("user/bpGraph", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          this.bloodPressureGraphData = success.data
          // console.log("Blood Pressure Graph Data",this.bloodPressureGraphData)

          let systolicValue = [];
          this.barChartLabelsBlood=[];
          for (var i = 0; i < this.bloodPressureGraphData.graph1.graph?.length; i++) {
            var abc = {
              "value": this.bloodPressureGraphData.graph1.graph[i]?.syncValues,
            }
            this.barChartLabelsBlood.push('');
            systolicValue.push(abc.value)
          }
           this.barChartDataBlood[0].data=systolicValue

          let diastolicValue = [];
          for (var i = 0; i < this.bloodPressureGraphData.graph2.graph?.length; i++) {
            var abc = {
              "value": this.bloodPressureGraphData.graph2.graph[i]?.syncValues,
            }
            diastolicValue.push(abc.value)
          }
          this.barChartDataBlood[1].data=diastolicValue



        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  getCheckinQuestionList() {
    this.service.getApiWithAuth("user/checkInQuestionDropDown").subscribe(success => {
      if (success.status == 200) {
        // this.questionList = success.data

        console.log("this.questionList", this.questionList)

      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  questionChange(e: any) {
    console.log("eeeeeeeeeee", e.target.value)

    this.getcheckinAnalysisList(e.target.value)
  }

  getcheckinAnalysisList(id: any,selectedButton:string='day') {
    for (let key in this.checkInAnalysisButton) {
      if(String(key) == selectedButton){
        this.checkInAnalysisButton[key]='active'
      }
      else{
        this.checkInAnalysisButton[key]='';
      }
  }
    let data = {
      userId: this.userData._id,
      timeZone: 'America/Chicago',
      forData: selectedButton,
      questionId:id,
    }
      this.service.postApi(`user/getUserCheckins` ,data ,1).subscribe(success => {
      if (success.status == 200) {
      this.selectedQuestion =   this.questionList.find((x:any)=> x._id === id)
      this.selectedQuestionTime = success.data;
      this.conversionTimeChartData(selectedButton);
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  getColorCode(para: any) {
    if (para.parameters.range) {
      if (para.parameters.range && para.syncDataLast) {
        if (para.syncDataLast.value < para.parameters.minRange || para.syncDataLast.value > para.parameters.maxRange) {
          return "Pink"
        } else {
          return "Aqua"
        }
      } else {
        return "Orange"
      }
    } else {
      return "Aqua"
    }
  }

  getAllCheckinQuestions(): void {
    let data = {
      userId: this.userData._id,
      timeZone: 'America/Chicago'
    }
    this.service.postApi("user/getAllCheckinQuestions", data, 1).subscribe({
      next: (success) => {
        if (success.status == 200) {
          console.log('success: ', success);
          this.questionList = success.data
        }
        else {
          this.service.err(success.message)
        }
      },
      error: (error) => {
        console.log({ error })
      }
    })
  }

  buttonSelection(selectedButton:string){
    for (let key in this.checkInAnalysisButton) {
      if(String(key) == selectedButton){
        this.checkInAnalysisButton[key]='active'
      }
      else{
        this.checkInAnalysisButton[key]='';
      }
  }
  this.getcheckinAnalysisList(this.selectedQuestion._id , selectedButton)
  }

  conversionTimeChartData(selectedTime:string){
    this.stdDeviation = 0;
    this.average = 0;
    this.max = 0;
    this.min = 0;
    if (this.selectedQuestion.isQuestionNumberType == 'yes' &&  this.selectedQuestionTime.length ) {
      if (selectedTime == 'week') {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.barChartLabelsQuestions = [];
        this.barChartLabelsQuestions = ['', '', '', '', '', '', ''];
        let groupedObjects: any = {};
        this.selectedQuestionTime.forEach((obj: any) => {
          let createdDate = daysOfWeek[new Date(obj.createdAt).getDay()];
          if (!groupedObjects[createdDate]) {
            groupedObjects[createdDate] = [];
          }
          groupedObjects[createdDate].push(obj);
        });
        // Calculate average values for each group
        for (let date in groupedObjects) {
          let totalSum = groupedObjects[date].reduce(
            (acc: any, obj: any) => acc + parseInt(obj.answer),
            0
          );
          let average = totalSum / groupedObjects[date].length;
          this.weekData.forEach((week, index) => {
            if (week.day == date) {
              week.value = Math.ceil(average);
            }
          });
        }
        this.barChartLegedsQuestions = daysOfWeek;
        this.barChartQuestions[0].data = this.weekData.map(
          (week) => week.value
        );
        let filteredNumbers: any[] = this.barChartQuestions[0].data.filter(
          (num: any) => num > 0
        );
        this.calculateAvergaeMinMax(
          filteredNumbers,
          this.barChartQuestions[0].data
        );
      } else if (selectedTime == 'day') {
        var dayDataAll = [
          { hour: '12 AM', value: 0.0 },
          { hour: '1 AM', value: 0.0 },
          { hour: '2 AM', value: 0.0 },
          { hour: '3 AM', value: 0.0 },
          { hour: '4 AM', value: 0.0 },
          { hour: '5 AM', value: 0.0 },
          { hour: '6 AM', value: 0.0 },
          { hour: '7 AM', value: 0.0 },
          { hour: '8 AM', value: 0.0 },
          { hour: '9 AM', value: 0.0 },
          { hour: '10 AM', value: 0.0 },
          { hour: '11 AM', value: 0.0 },
          { hour: '12 PM', value: 0.0 },
          { hour: '1 PM', value: 0.0 },
          { hour: '2 PM', value: 0.0 },
          { hour: '3 PM', value: 0.0 },
          { hour: '4 PM', value: 0.0 },
          { hour: '5 PM', value: 0.0 },
          { hour: '6 PM', value: 0.0 },
          { hour: '7 PM', value: 0.0 },
          { hour: '8 PM', value: 0.0 },
          { hour: '9 PM', value: 0.0 },
          { hour: '10 PM', value: 0.0 },
          { hour: '11 PM', value: 0.0 },
        ];
        this.selectedQuestionTime.forEach((data: any) => {
          let hour = new Date(data.createdAt).getHours();
          const period: string =  new Date(data.createdAt).getHours() >= 12 ? 'PM' : 'AM';
          // Convert to 12-hour format
          if (hour > 12) {
            hour -= 12;
          }

          // Handle midnight (0 hour)
          if (hour === 0) {
            hour = 12;
          }
          const time = hour + ' ' + period;
        });
        this.barChartLabelsQuestions = [];
        let groupedObjects: any = {};
        this.selectedQuestionTime.forEach((obj: any) => {
          let hour = new Date(obj.createdAt).getHours();

          const period: string =
            new Date(obj.createdAt).getHours() >= 12 ? 'PM' : 'AM';
          // Convert to 12-hour format
          if (hour > 12) {
            hour -= 12;
          }

          // Handle midnight (0 hour)
          if (hour === 0) {
            hour = 12;
          }
          const time = hour + ' ' + period;
          if (!groupedObjects[time]) {
            groupedObjects[time] = [];
          }
          groupedObjects[time].push(obj);
        });

        // Calculate average values for each group
        for (let date in groupedObjects) {
          let totalSum = groupedObjects[date].reduce(
            (acc: any, obj: any) => acc + parseInt(obj.answer),
            0
          );
          let average = totalSum / groupedObjects[date].length;
          dayDataAll.forEach((dayData, index) => {
            if (dayData.hour == date) {
              dayData.value = Math.ceil(average);
            }
          });
        }
        this.barChartQuestions[0].data = dayDataAll.map((day) => {
          this.barChartLabelsQuestions.push('');
          return day.value;
        });
        this.barChartLegedsQuestions = this.dayData.map((x) => {
          return x.hour;
        });
        let filteredNumbers: any[] = this.barChartQuestions[0].data.filter(
          (num: any) => num > 0
        );
        this.calculateAvergaeMinMax(
          filteredNumbers,
          this.barChartQuestions[0].data
        );
      } else if (selectedTime == 'year') {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        this.barChartLabelsQuestions = [];
        let groupedObjects: any = {};
        this.selectedQuestionTime.forEach((obj: any) => {
          let createdDate = months[new Date(obj.createdAt).getMonth()];
          if (!groupedObjects[createdDate]) {
            groupedObjects[createdDate] = [];
          }
          groupedObjects[createdDate].push(obj);
        });

        // Calculate average values for each group
        let averages: any = {};
        for (let date in groupedObjects) {
          let totalSum = groupedObjects[date].reduce(
            (acc: any, obj: any) => acc + parseInt(obj.answer),
            0
          );
          let average = totalSum / groupedObjects[date].length;
          this.yearData.forEach((year, index) => {
            if (year.month == date) {
              year.value = Math.ceil(average);
            }
          });
        }
        this.barChartQuestions[0].data = this.yearData.map((year) => {
          this.barChartLabelsQuestions.push('');
          return year.value;
        });
        let filteredNumbers: any[] = this.barChartQuestions[0].data.filter(
          (num: any) => num > 0
        );
        this.calculateAvergaeMinMax(
          filteredNumbers,
          this.barChartQuestions[0].data
        );
        this.barChartLegedsQuestions = months;
      } else if (selectedTime == 'month') {
        this.barChartLabelsQuestions = [];
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        let monthName = '';
        const dayValues: any[] = [];
        this.barChartLabelsQuestions = [];
        if (this.selectedQuestionTime.length) {
          monthName =
            months[new Date(this.selectedQuestionTime[0].createdAt).getMonth()];
        }
        for (var i = 0; i < 31; i++) {
          this.barChartLabelsQuestions.push('');
        }
        this.barChartLegedsQuestions = [
          `1 ${monthName}`,
          `6 ${monthName}`,
          `11 ${monthName}`,
          `16 ${monthName}`,
          `21 ${monthName}`,
          `28 ${monthName}`,
        ];
        let groupedObjects: any = {};
        this.selectedQuestionTime.forEach((obj: any) => {
          let createdDate = new Date(obj.createdAt).getDate();
          if (!groupedObjects[createdDate]) {
            groupedObjects[createdDate] = [];
          }
          groupedObjects[createdDate].push(obj);
        });

        // Calculate average values for each group
        let averages: any = {};
        for (let date in groupedObjects) {
          let totalSum = groupedObjects[date].reduce(
            (acc: any, obj: any) => acc + parseInt(obj.answer),
            0
          );
          let average = totalSum / groupedObjects[date].length;
          dayValues.push({
            day: date,
            value: Math.ceil(average),
          });
        }
        this.barChartQuestions[0].data = dayValues.map((x: any) => x.value);
        if (this.barChartQuestions[0]?.data) {
          const chartData: any[] = this.barChartQuestions[0].data;
          let filteredNumbers: any[] = chartData.filter((num: any) => num > 0);
          this.calculateAvergaeMinMax(
            filteredNumbers,
            this.barChartQuestions[0].data
          );
        }
      }
    }
    else if(this.selectedQuestion.isQuestionNumberType == 'no' && this.selectedQuestionTime.length){
      this.overallHealthChartLabels=[];
      this.overallHealthChart =[];
      this.legendsEmoji=[];
      if (selectedTime == 'week') {
         const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const answerCounts:any = {};
        this.selectedQuestionTime.forEach((obj:any) => {
            const answer = obj.answer;
            if (answerCounts[answer]) {
                answerCounts[answer]++;
            } else {
                answerCounts[answer] = 1;
            }
        });
        let groupedObjects: any = {};
        this.selectedQuestionTime.forEach((obj: any) => {
          let createdDate = daysOfWeek[new Date(obj.createdAt).getDay()];
          if (!groupedObjects[createdDate]) {
            groupedObjects[createdDate] = [];
          }
          groupedObjects[createdDate].push(obj);
        });

        this.overallHealthChart=[];
         var week = this.weekData.map((x)=>{x.value = 0 ;return x  });
        for (let anser in answerCounts) {
          var week = this.weekData.map((x)=>{x.value = 0 ;return x  });
          for (let date in groupedObjects) {
            week.find((week, index) => {
              if (week.day == date) {
                groupedObjects[date].forEach((x: any) => {
                  if (x.answer == anser) {
                    week.value = week.value + 1;
                  }
                });
              return ;
              }
            });
          }
          let count=this.labelsInfo.findIndex((x)=> x.value==anser);
          this.overallHealthChart.push({
            label: this.labelsInfo[count].label,
            borderWidth: 1,
            data: week.map((x) => x.value),
            fill: false,
            borderColor:this.labelsInfo[count].color,
            pointBackgroundColor:this.labelsInfo[count].color,
            backgroundColor:this.labelsInfo[count].color
          });
          this.legendsEmoji.push({
            imgPath: this.labelsInfo[count].imgPath,
            color: this.labelsInfo[count].color,
            label:  this.labelsInfo[count].label,
            status:this.labelsInfo[count].status,
          });
        }
        this.emojiChartLabels = daysOfWeek;
        this.overallHealthChartLabels =daysOfWeek;
     this.legendsEmoji=   this.legendsEmoji.sort((a, b) => a.status - b.status);
      }else if (selectedTime == 'day') {
        var dayDataAll = [
          { hour: '12 AM', value: 0.0 },
          { hour: '1 AM', value: 0.0 },
          { hour: '2 AM', value: 0.0 },
          { hour: '3 AM', value: 0.0 },
          { hour: '4 AM', value: 0.0 },
          { hour: '5 AM', value: 0.0 },
          { hour: '6 AM', value: 0.0 },
          { hour: '7 AM', value: 0.0 },
          { hour: '8 AM', value: 0.0 },
          { hour: '9 AM', value: 0.0 },
          { hour: '10 AM', value: 0.0 },
          { hour: '11 AM', value: 0.0 },
          { hour: '12 PM', value: 0.0 },
          { hour: '1 PM', value: 0.0 },
          { hour: '2 PM', value: 0.0 },
          { hour: '3 PM', value: 0.0 },
          { hour: '4 PM', value: 0.0 },
          { hour: '5 PM', value: 0.0 },
          { hour: '6 PM', value: 0.0 },
          { hour: '7 PM', value: 0.0 },
          { hour: '8 PM', value: 0.0 },
          { hour: '9 PM', value: 0.0 },
          { hour: '10 PM', value: 0.0 },
          { hour: '11 PM', value: 0.0 },
        ];
        const answerCounts:any = {};
        this.selectedQuestionTime.forEach((obj:any) => {
            const answer = obj.answer;
            if (answerCounts[answer]) {
                answerCounts[answer]++;
            } else {
                answerCounts[answer] = 1;
            }
        });
        let groupedObjects: any = {};
        this.selectedQuestionTime.forEach((obj: any) => {
    let hour = new Date(obj.createdAt).getHours();
          const period: string = new Date(obj.createdAt).getHours() >= 12 ? 'PM' : 'AM';
          // Convert to 12-hour format
          if (hour > 12) {
            hour -= 12;
          }
          // Handle midnight (0 hour)
          if (hour === 0) {
            hour = 12;
          }
          let time = hour + ' ' + period;
          if (!groupedObjects[time]) {
            groupedObjects[time] = [];
          }
          groupedObjects[time].push(obj);
        });
        var dayAllValues = dayDataAll.map((x)=>{x.value = 0.0 ;return x  });
        for (let anser in answerCounts) {
          var dayAllValues = dayDataAll.map((x)=>{x.value = 0.0 ;return x  });
          for (let date in groupedObjects) {
            dayAllValues.find((day, index) => {
              if (day.hour == date) {
                groupedObjects[date].forEach((x: any) => {
                  if (x.answer == anser) {
                    day.value = day.value + 1;
                  }
                });
              return ;
              }
            });
          }
          let count=this.labelsInfo.findIndex((x)=> x.value==anser);
          this.overallHealthChart.push({
            label: this.labelsInfo[count].label,
            borderWidth: 1,
            data: dayAllValues.map((x) => x.value),
            fill: false,
            borderColor:this.labelsInfo[count].color,
            pointBackgroundColor:this.labelsInfo[count].color,
            backgroundColor:this.labelsInfo[count].color
          });
          this.legendsEmoji.push({
            imgPath: this.labelsInfo[count].imgPath,
            color: this.labelsInfo[count].color,
            label:  this.labelsInfo[count].label,
            status:this.labelsInfo[count].status,
          });
        }
        this.overallHealthChartLabels=[];
        dayDataAll.forEach((x)=>{
          this.overallHealthChartLabels.push(x.hour);
        });
        this.emojiChartLabels = this.dayData.map((x) => {
          return x.hour;
        });
         this.overallHealthChartLabels = [... this.overallHealthChartLabels ];
         this.legendsEmoji=   this.legendsEmoji.sort((a, b) => a.status - b.status);
      } else if (selectedTime == 'year') {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
   const answerCounts:any = {};
   this.selectedQuestionTime.forEach((obj:any) => {
       const answer = obj.answer;
       if (answerCounts[answer]) {
           answerCounts[answer]++;
       } else {
           answerCounts[answer] = 1;
       }
   });
   let groupedObjects: any = {};
   this.selectedQuestionTime.forEach((obj: any) => {
     let createdDate = months[new Date(obj.createdAt).getMonth()];
     if (!groupedObjects[createdDate]) {
       groupedObjects[createdDate] = [];
     }
     groupedObjects[createdDate].push(obj);
   });
   this.overallHealthChart=[];
   var year = this.yearData.map((x)=> {x.value=0;  return x } );
   for (let anser in answerCounts) {
    var year = this.yearData.map((x)=> {x.value=0;  return x } );
     for (let month in groupedObjects) {
       year.forEach((year, index) => {
         if (year.month == month) {
           groupedObjects[month].forEach((x: any) => {
             if (x.answer == anser) {
               year.value = year.value + 1;
             }
           });
         }
       });
     }
     let count=this.labelsInfo.findIndex((x)=> x.value==anser)
     this.overallHealthChart.push({
       label: this.labelsInfo[count].label,
       borderWidth: 1,
       data: year.map((x) => x.value),
       fill: false,
       borderColor:this.labelsInfo[count].color,
       pointBackgroundColor:this.labelsInfo[count].color,
       backgroundColor:this.labelsInfo[count].color,  
         });
         this.legendsEmoji.push({
          imgPath: this.labelsInfo[count].imgPath,
          color: this.labelsInfo[count].color,
          label:  this.labelsInfo[count].label,
          status:this.labelsInfo[count].status,
        });
   }
         this.emojiChartLabels = months;
         this.overallHealthChartLabels =months;
         this.legendsEmoji=  [... this.legendsEmoji.sort((a, b) => a.status - b.status)];
      } else if(selectedTime == 'month'){
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        let monthName = '';
        const dayValues: any = [];
        if (this.selectedQuestionTime.length) {
          monthName =
            months[new Date(this.selectedQuestionTime[0].createdAt).getMonth()];
        }
        this.emojiChartLabels = [
          `1 ${monthName}`,
          `6 ${monthName}`,
          `11 ${monthName}`,
          `16 ${monthName}`,
          `21 ${monthName}`,
          `28 ${monthName}`,
        ];

      const answerCounts:any = {};
   this.selectedQuestionTime.forEach((obj:any) => {
       const answer = obj.answer;
       if (answerCounts[answer]) {
           answerCounts[answer]++;
       } else {
           answerCounts[answer] = 1;
       }
   });
   let groupedObjects: any = {};
   this.selectedQuestionTime.forEach((obj: any) => {
    let createdDate = new Date(obj.createdAt).getDate();
    if (!groupedObjects[createdDate]) {
       groupedObjects[createdDate] = [];
     }
     groupedObjects[createdDate].push(obj);
   });
   this.overallHealthChart=[];
   var monthData = this.monthData.map((x)=> {x.value=0;  return x } );
   for (let anser in answerCounts) {
     monthData = this.monthData.map((x)=> {x.value=0;  return x } );
     for (let date in groupedObjects) {
      monthData.forEach((monthDay, index) => {
         if (monthDay.day == date) {
           groupedObjects[date].forEach((x: any) => {
             if (x.answer == anser) {
              monthDay.value = monthDay.value + 1;
             }
           });
         }
       });
     }
     let count=this.labelsInfo.findIndex((x)=> x.value==anser)
     this.overallHealthChart.push({
       label: this.labelsInfo[count].label,
       borderWidth: 1,
       data: monthData.map((x) => x.value),
       fill: false,
       borderColor:this.labelsInfo[count].color,
       pointBackgroundColor:this.labelsInfo[count].color,
       backgroundColor:this.labelsInfo[count].color
     });
     this.legendsEmoji.push({
      imgPath: this.labelsInfo[count].imgPath,
      color: this.labelsInfo[count].color,
      label:  this.labelsInfo[count].label,
      status:this.labelsInfo[count].status,
    });
   }
   const labels:any[]=[];
   for (var i = 0; i < 31; i++) {
           labels.push(`${i+1} ${monthName}`);
  }
this.overallHealthChartLabels = labels;
this.legendsEmoji=   this.legendsEmoji.sort((a, b) => a.status - b.status);
      }
    }
  }

   calculateStandardDeviation(numbers:any[]) {
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    let mean = sum / numbers.length;
    let squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
    let squaredDifferencesSum = squaredDifferences.reduce((acc, num) => acc + num, 0);
    let squaredDifferencesMean = squaredDifferencesSum / numbers.length;
    let standardDeviation = Math.sqrt(squaredDifferencesMean);
    return standardDeviation;
}

calculateAvergaeMinMax(filteredNumbers:any[],chartData:any[]){
    this.min = Math.min(...filteredNumbers);
    this.max = Math.max(...filteredNumbers);
    let allAveragesValues:number[] = this.selectedQuestionTime.map((x:any)=> Number(x.answer));
    this.average = allAveragesValues.reduce((a, b) => a + b, 0) / allAveragesValues.length
    this.stdDeviation = this.calculateStandardDeviation(chartData);
}

}
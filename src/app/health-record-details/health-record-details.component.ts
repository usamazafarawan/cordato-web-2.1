import { Component, OnInit,ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
 

@Component({
  selector: 'app-health-record-details',
  templateUrl: './health-record-details.component.html',
  styleUrls: ['./health-record-details.component.css']
})
export class HealthRecordDetailsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;



  // public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "cholestrol, Total",
          data: [ 100, 100, 100, 100, 100, 100 ]
        },
        {
          name: "Normal Low",
          data: [20, 20, 20, 20, 20, 20]
        },
        {
          name: "Normal High",
          data: [90, 85, 80, 78, 75, 72]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        }
      },
      title: {
        text: ""   
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      },
    };
  }
  ngOnInit() {
  }

} 

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
declare var $: any;
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html',
  styleUrls: ['./health-record.component.css']
})
export class HealthRecordComponent implements OnInit {
  @ViewChild('svgElement') svgElement!: ElementRef<SVGElement>;
  @ViewChild('svgElementBack') svgElementBack!: ElementRef<SVGElement>;

  checkinList:any=[]
  vitalList:any=[]
  ecgList:any=[]
  hrxDrx:any=[]

  userData:any
  familyList:any=[]
  parameterList: any = []

  allMyFiles: any = []
  appointments: any = []
  allTask: any = []
  selectedFile: File | null = null;
  comment: string = '';
  uploadProgress = 0;
  uploadSuccess: boolean | null = null;
  uploadError: string | null = null;

  baseImageFront: string | null = null;
  baseImageBack: string | null = null;
  overLayImageFront: string | null = null;
  overLayImageBack: string | null = null;
  selectedPara: any
  subParameterList: any = []
  subParameterListBackup: any = []
  otpForm: FormGroup
  selectedSubParaids: any
  idx: number = 0;

  vitalsData : any =[
    {
      "name": "Glucose",
      "value": 92,
      "minValue": 65,
      "maxValue": 99,
      "unit": "mg/dl"
    },
    {
      "name": "BUN",
      "value": 7,
      "minValue": 6,
      "maxValue": 20,
      "unit": "mg/dl"
    },
    {
      "name": "Sodium",
      "value": 146,
      "minValue": 134,
      "maxValue": 144,
      "unit": "mmol/L"
    }
  ]

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    
  ) {
    this.otpForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]],
      searchText: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    $("#loader").show()
    this.onGetUserData()
    this.onGetParaList()
  }

  ngAfterViewInit(): void {
  }

  onGetHrxDrx(){
    this.service.getApiWithAuth("user/getHrxDrxHistory").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.hrxDrx = success.data
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

  onGetCheckin(){
    this.service.getApiWithAuth("user/getCheckingList").subscribe(success => {
      if (success.status == 200) {
        this.checkinList = success.data.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
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

  onGetVitalHistory(){
    this.service.getApiWithAuth("user/getVitalHistory").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.vitalList = success.data
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

  onGetECG(){
    this.service.getApiWithAuth("user/getEcgListOfUser").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        this.ecgList = success.data
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onGetUserData(){
    this.service.getApiWithAuth("user/getUserData").subscribe(success => {
      if (success.status == 200) {
        this.userData = success.data
        this.getAllMyFile()
        this.getAllAppointments()
        this.getAllTasks()
      }
      else {
        this.service.err(success.message)
        $("#loader").hide()
      }
    }, error => {
      console.log({ error })
    })
  }

  getFamilyList(): void {
    this.service.getApiWithAuth("user/familyList").subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.familyList = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }
  getColorCode(para:any){
    console.log(para)

    if(para.parameters.range){

      if(para.parameters.range && para ){

        if(para.value<para.parameters.minRange || para.value>para.parameters.maxRange){
          return "Bad"
        }else{
          return "Good"
        }

      }else{
        return "Bad"
      }

    }else{
      return "Good"
    }
    // if(para && para.parameters){

    //   if()
    //   // return "Aqua"
    // }else{
    //   return "Aqua"
    // }

  }

  onGetreports(){
    this.service.getApiWithAuth("user/genratePdf").subscribe(success => {
      if (success.status == 200) {
        console.log(success)

        window.open(success.data.path)
        // this.hrxDrx = success.data
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

  onGetParaList(): void {
    this.service.getApiWithAuth("user/getParametersList").subscribe(success => {
      if (success.status == 200) {
        // this.service.succ(success.message)
        this.parameterList = success.data 
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  getAllMyFile() {
    let data = {
      userId: this.userData._id
    }
    this.service.postApiWithAuth("user/allMyFiles", data, 1).subscribe(success => {
      if (success.status == 200) {
        this.allMyFiles = success.data
      }
      else {
        this.service.err(success.message)
        $("#loader").hide()
      }
    }, error => {
      $("#loader").hide()
      console.log({ error })
    })
  }

  getAllAppointments() {
    let data = {
      userId: this.userData._id
    }
    this.service.postApiWithAuth("user/getAppointmentListOfUser", data, 1).subscribe(success => {
      if (success.status == 200) {
        this.appointments = success.data
        this.loadSvgAndManipulate()
      }
      else {
        this.service.err(success.message)
        $("#loader").hide()
      }
    }, error => {
      $("#loader").hide()
      console.log({ error })
    })
  }

  
  getAllTasks() {
    let data = {
      userId: this.userData._id
    }
    this.service.postApiWithAuth("user/allMyTasks", data, 1).subscribe(success => {
      if (success.status == 200) {
        this.allTask = success.data
        $("#loader").hide()
      }
      else {
        this.service.err(success.message)
        $("#loader").hide()
      }
    }, error => {
      console.log({ error })
      $("#loader").hide()
    })
  }


  onSelectParameter(para: any) {
    this.selectedPara = para
    this.onGetSubParaList(para._id)
    $('#MedicationModal').modal('show')
  }

  onGetSubParaList(ids: any): void {
    let data = {
      parameterId: ids
    }
    this.service.postApiWithAuth("user/subParametersWithStatus", data, 1).subscribe(success => {
      if (success.status == 200) { 
        // this.service.succ(success.message)
        this.subParameterList = success.data
        this.subParameterListBackup = success.data
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }
  
  ondelete(subId: any, parId: any) {
    let data = {
      subParametersId: subId,
      parameterId: parId
    }
    this.service.postApiWithAuth("user/deleteUserParameters", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.onGetParaList()
        // this.route.navigate(['/register-personal'])
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })

  }

  onNextSubParameters() {

    let selectedParams = this.subParameterList.filter((it: any) => it.isSelected)
    let arrayVale = []
    for (let index = 0; index < selectedParams.length; index++) {
      arrayVale.push(selectedParams[index]._id)
    }
    let selectedParamsIds = arrayVale.toString()
    this.selectedSubParaids = selectedParamsIds
    console.log(selectedParams)
    console.log(selectedParamsIds)
    this.onSaveSelectedParameter()
  }

  onSaveSelectedParameter() {
    let data = {
      parameterId: this.selectedPara['_id'],
      selectedSubParameters: this.selectedSubParaids
    }
    this.service.postApiWithAuth("user/userUpdateParameters", data, 1).subscribe(success => {
      if (success.status == 200) {
        console.log(success)
        // this.service.succ(success.message)
        this.selectedPara = null
        this.selectedSubParaids = null
        $('#MedicationModal').modal('hide')
        this.onGetParaList()
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  onInputCheckChage(item: any) {
    console.log(item.isSelected)

    let isSelected = !item.isSelected
    console.log(isSelected)
    let index1 = this.subParameterList.map((it: any) => { return it._id }).indexOf(item._id)


    let index2 = this.subParameterListBackup.map((it: any) => { return it._id }).indexOf(item._id)

    console.log(index1)

    this.subParameterList[index1].isSelected = isSelected

    this.subParameterListBackup[index2].isSelected = isSelected

    console.log(this.subParameterList)
    console.log(this.subParameterListBackup)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('comment', this.comment);

    this.service.formdataApi("user/uploadUserFile", formData).subscribe(success => {
      if (success.status == 200) {
        this.getAllMyFile()
        this.selectedFile = null
        this.comment = ''
      }
      else {
        this.service.err(success.message)
      }
    }, error => {
      console.log({ error })
    })
  }

  loadSvgAndManipulate(): void {

    if(this.appointments.length > 0 && this.appointments[0].ids.length > 0){
      if("Male"== this.appointments[this.idx].ids[0].gender) {
        this.baseImageBack = "assets/images/Male-Back.png"
        this.baseImageFront = "assets/images/Male-Front.png"
        this.overLayImageBack = "assets/images/MaleBack.svg"
        this.overLayImageFront = "assets/images/MaleFront.svg"
      } else {
        this.baseImageBack = "assets/images/Female-Back.png"
        this.baseImageFront = "assets/images/Female-Front.png"
        this.overLayImageBack = "assets/images/FemaleBack.svg"
        this.overLayImageFront = "assets/images/FemaleFront.svg"
      }

      let frontSideValues = this.appointments[this.idx].ids.filter((item: { side: string; }) => item.side === 'front').map((item: { id: any; }) => item.id);
      let backSideValues = this.appointments[this.idx].ids.filter((item: { side: string; }) => item.side === 'back').map((item: { id: any; }) => item.id);


      this.http.get(this.overLayImageFront, { responseType: 'text' }).subscribe(
        (data) => {
          const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(data);
          if (this.svgElement && this.svgElement.nativeElement) {
            this.renderer.setProperty(this.svgElement.nativeElement, 'innerHTML', sanitizedContent);
            this.changeSvgProperties(frontSideValues);
          } else {
            console.error('SVG element or its native element not found');
          }
        },
        (error) => {
          console.error('Error loading SVG', error);
        }
      );

      this.http.get(this.overLayImageBack, { responseType: 'text' }).subscribe(
        (data) => {
          const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(data);
          if (this.svgElementBack && this.svgElementBack.nativeElement) {
            this.renderer.setProperty(this.svgElementBack.nativeElement, 'innerHTML', sanitizedContent);
            this.changeSvgPropertiesBck(backSideValues)
          } else {
            console.error('SVG element or its native element not found');
          }
        },
        (error) => {
          console.error('Error loading SVG', error);
        }
      );
    }

    
  }

  changeSvgProperties(frontSideArray : any): void {
    if (!this.svgElement || !this.svgElement.nativeElement) {
      console.error('SVG element or its native element not found');
      return;
    }

    const svgElement = this.svgElement.nativeElement;
    const paths = svgElement.querySelectorAll('path'); // Adjust selector based on your SVG structure

    paths.forEach((path: SVGPathElement) => {
      if (frontSideArray.includes(path.id) || frontSideArray.includes(path.id.toLocaleLowerCase())) { // Example of filtering by ID containing specific substring
        this.renderer.setStyle(path, 'fill', 'red');
        this.renderer.setStyle(path, 'opacity', '1');
      }
    });
  }

  changeSvgPropertiesBck(frontSideArray : any): void {
    if (!this.svgElementBack || !this.svgElementBack.nativeElement) {
      console.error('SVG element or its native element not found');
      return;
    }

    const svgElement = this.svgElementBack.nativeElement;
    const paths = svgElement.querySelectorAll('path'); // Adjust selector based on your SVG structure

    paths.forEach((path: SVGPathElement) => {
      const pathId = path.id; // Convert ID to lowercase for case-insensitive comparison
      if (frontSideArray.includes(path.id) || frontSideArray.includes(path.id.toLocaleLowerCase())) { // Example of filtering by ID containing specific substring
        this.renderer.setStyle(path, 'fill', 'red');
        this.renderer.setStyle(path, 'opacity', '1');
      }
    });
  }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleString('en-GB', options);
  }

  onCollapseClick(idex: number) {
    this.idx = idex;
    this.loadSvgAndManipulate()
  }
}




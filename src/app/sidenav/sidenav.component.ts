import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'
import * as moment from 'moment';

declare function Header(): any;  
 
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
userData:any=''
  constructor(
    public appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userData=this.appProvider.current.loginData
    // console.log( this.userData)

    Header()
  }

  getDate(date:any){
   return moment(date).format('YYYY-MM-DD')
  }

  logout(){
    this.route.navigate(['/']) 
    this.service.succ("Logout successfully")
    localStorage.clear();
    
  }




}
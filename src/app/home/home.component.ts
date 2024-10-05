import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../app.provider'

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/json/animation-1.json',
  };

  options2: AnimationOptions = {
    path: '/assets/json/animation-2.json',
  };

  currentLong:any
  currentLat:any

  constructor(
    private appProvider: AppProvider,
    private route: Router,
    private service: AppService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  public scroll(id: any) {
    let el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }


  ngOnInit(): void {

    this.service.getPosition().then(pos=>{

      console.log("pos",pos)

      this.currentLong = pos.lng
      this.currentLat = pos.lat 
 
    });


  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }





}

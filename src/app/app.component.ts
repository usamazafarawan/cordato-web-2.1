import { Component ,OnInit} from '@angular/core';
import { AppProvider } from './app.provider'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodDelivery';


  constructor(
    private appProvider: AppProvider,
  ) { 

    let healthAdminLog:any= localStorage.getItem('healthlogin')?localStorage.getItem('healthlogin'):null

    let healthAppLog:any= localStorage.getItem('healthAppLog')?localStorage.getItem('healthAppLog'):null
    let healthchecking:any= localStorage.getItem('healthchecking')?localStorage.getItem('healthchecking'):null

    let healthAppchecking:any= localStorage.getItem('healthppcheck')?localStorage.getItem('healthppcheck'):null
    this.appProvider.current.loginData=JSON.parse(healthAdminLog)
    this.appProvider.current.currentAppointment=JSON.parse(healthAppLog)
    this.appProvider.current.currentChecking=JSON.parse(healthchecking)
    this.appProvider.current.checkinAppointment=JSON.parse(healthAppchecking)

  
  //  localStorage.setItem('biteRestReq', JSON.stringify(this.appProvider.current.restaurantsReq));

  }
  ngOnInit(): void {
    // this.service.succ("shhshsh")

  }
  
}

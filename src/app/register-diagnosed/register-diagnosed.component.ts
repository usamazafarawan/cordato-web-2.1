import { Component, OnInit } from '@angular/core';

declare function MedicationList(): any; 

@Component({
  selector: 'app-register-diagnosed',
  templateUrl: './register-diagnosed.component.html',
  styleUrls: ['./register-diagnosed.component.css']
})
export class RegisterDiagnosedComponent implements OnInit {

  constructor() { }

  ngOnInit()  {

    MedicationList()  
      
  }

}

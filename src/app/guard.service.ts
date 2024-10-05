import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import {HttpClient,HttpHeaders,HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: "root",
})

export class GuardService implements CanActivate {
    
    constructor(
        public router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() { }

    canActivate(): boolean {
        let user: any = localStorage.getItem("healthlogin");
        user = JSON.parse(user)
        if (user) {
            // console.log('==========>>>.user', user)
            return true;
        } else { 
            this.router.navigateByUrl("/");
            return false;
        }
    }

}
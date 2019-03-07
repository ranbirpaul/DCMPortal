import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

isAuthor:boolean=true;
  constructor(private adalSvc: MsAdalAngular6Service) {
    
   }
   logOut(){
    this.adalSvc.logout();
   }

   loginInfo(){
    this.isAuthor=true;
     /*if(!this.adalSvc.LoggedInUserName.includes('Guru')){
       this.isAuthor=false;
     }*/
     return this.adalSvc.LoggedInUserName;
   }
}

import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { httpFactory } from '@angular/http/src/http_module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  public isAuthor:boolean=true;
  constructor(private adalSvc: MsAdalAngular6Service, private httpclient: HttpClient) 
  {
  }
   
   logOut()
   {
     this.adalSvc.logout();
   }

   loginInfo()
   {
      this.isAuthor=true;
      return this.adalSvc.LoggedInUserName;
   }

   ngOnInit() 
   {
   }

   getAccessToken()
   {
      var accessToken:string;
      if (this.adalSvc.isAuthenticated)
      {
        // Will take care of id_token, access_token and refresh_token
        var tokenresult = this.adalSvc.acquireToken('https://ABB.onmicrosoft.com/APIApplication');
        tokenresult.subscribe(token => {
        // Get the access token here
        accessToken = token;
        console.log(accessToken);
      },
      err => {
              console.log(err);
        }
      );
      }
    
      return accessToken;
   }
  }

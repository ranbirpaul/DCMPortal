import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TestapitokenService {
  url:string = 'https://localhost:44398/api/Test/Getusername'; 
  constructor(private authService:AuthenticationService, private httpclient: HttpClient) 
  { 
  }

  getUserName(): Observable<HttpResponse<any>> 
  {
    // Step 1 Get the token from AuthService
    var accessToken = this.authService.getAccessToken();
    // Step 2 Call Web API with token to access API method https://localhost:44398/api/Test/Getusername
    // Manual token setup without Auto Interceptor
    const headers = new  HttpHeaders().set("Authorization", "Bearer " + accessToken);
    return this.httpclient.get(this.url, {headers:headers, observe: 'response', responseType:'text'});
   }
}

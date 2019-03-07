import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable,of } from 'rxjs';
import { NEXT } from '@angular/core/src/render3/interfaces/view';
//import {environment} from '../../environments/environment';
import { throwError } from 'rxjs';
import {ErrorService} from '../errorService/error.service';
import { share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string= 'https://abitydefregasbtc2eundev.azurewebsites.net/api/v1.0/modelDefinitions/';
  constructor(private httpClient:HttpClient,private errorService:ErrorService) { 

  }
  getData(url:string) :Observable<any>{
    console.log(`${url}`);
    var result = this.httpClient.get(`${url}`).pipe(share());
    result.subscribe(x=>{
    
    },
  (error)=>{
    console.log('Error occured..');
    console.log(error);
    this.errorService.addError({error:error});
  }
  )

    return result;
  }
  postData(url:string,obj:any):Observable<any> {
    const _header=new HttpHeaders({"Content-Type":"application/json"});
    var result=this.httpClient.post(`${url}`,obj,{headers: _header}).pipe(share());
    result.subscribe(x=>{      
    },
    (error)=>{
      this.errorService.addError({error:error});
    }
  );  
    return result;  
  } 
  deleteData(url:string,obj:any):Observable<any> {
    const _header=new HttpHeaders({"Content-Type":"application/json"});
    var result=this.httpClient.delete(this.baseUrl+`${url}`+obj,{headers: _header}).pipe(share());
    result.subscribe(x=>{},
      (error)=>{
        this.errorService.addError({error:error});
      });
    return result;
  }  

  deleteDataAbility(url:string):Observable<any> {
    //url="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/2e8abb59-74c3-4b25-919f-1f3cf868433c/models/abb.dca.location"
    const _header=new HttpHeaders({"Content-Type":"application/json"});
    var result=this.httpClient.delete(`${url}`,{headers: _header}).pipe(share());
    result.subscribe(x=>{},
      (error)=>{
        this.errorService.addError({error:error});
      });
    return result;
  }

  putData(url:string,obj:any):Observable<any> {
    const _header=new HttpHeaders({"Content-Type":"application/json"});
    var result=this.httpClient.put(this.baseUrl+`${url}`,obj,{headers: _header}).pipe(share());
    result.subscribe(x=>{},
      (error)=>{
        this.errorService.addError({error:error});
      });
    return result;

  }  
}

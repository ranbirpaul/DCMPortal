import { Injectable } from '@angular/core';
import {ApiService} from '../../../shared/dataservice/api.service';
import { Observable,of } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class EdgeObjectService {
  
    constructor(public apiService:ApiService) { }
    
    getObjects(model:string,type:string):Observable<any>{
      //abb.ability.device.rack@5
      let postData:any={
        query: "models('"+model+"').ofType('"+type+"')"
      }
      return this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/query",postData);
    }
    getObjectById(model:string,objectId:string):Observable<any>{
      let url:string="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+model;
      return this.apiService.getData(url)
    }
  
      deleteObjectByObjectId(objectId:string,abilityModel:string):Observable<any>{
        return this.apiService.deleteDataAbility("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+abilityModel);     
  
    }
  
    executeQuery(model:string,type:string):Observable<any>{
      let url:string="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/query";
     let jsonBody:any;
     jsonBody={
      query: "models('"+model+"').ofType('"+type+"')"
    }

    
    
    return   this.apiService.postData(url,jsonBody);
      
    }

    createChildrenReference(
      parentObjectId:string,
      objectId:string,
      model:string,
      childrenNode:string
    ):Observable<any>{
      let posts$:Observable<any>[]=[];
      let reference:any={
        name: childrenNode,
        to: {
          objectId: objectId,
          model: model
        }
    }
    console.log(reference);
    let post$=this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+parentObjectId+"/models/"+model+"/references/out", [reference]);    
    return post$;
    
    }
  }
  
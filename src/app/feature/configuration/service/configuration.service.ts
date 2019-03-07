  import { Injectable } from '@angular/core';
  import {ApiService} from '../../../shared/dataservice/api.service';
  import { Observable,of } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class ConfigurationService {
  
    constructor(public apiService:ApiService) { }
    
    getDcaType(model:string,type:string):Observable<any>{
      //abb.ability.device.rack@5
      let postData:any={
        query: "models('"+model+"').ofType('"+type+"')"
      }
      return this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/query",postData);
    }
    getDcaTypeById(model:string,objectId:string):Observable<any>{
      let url:string="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+model;
      return this.apiService.getData(url)
    }
  
      deleteTypeByObjectId(objectId:string,abilityModel:string):Observable<any>{
        return this.apiService.deleteDataAbility("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+abilityModel);     
  
    }
  }
  